import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAllRegistrations, useDeleteRegistration, useSetApproval } from '@/hooks/useQueries';
import { Loader2, Search, Trash2, LogOut, Shield, CheckCircle2, XCircle, IndianRupee, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RegistrationStatus, ApprovalStatus } from '@/backend';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useActorReady } from '@/hooks/useActorReady';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

type ActionType = 'delete' | 'approve' | 'reject';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { identity, isInitializing } = useInternetIdentity();
  const { actor, isReady } = useActorReady();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('timestamp');
  const [actionId, setActionId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [actionPrincipal, setActionPrincipal] = useState<string | null>(null);

  // Check authorization: requires both sessionStorage email AND Internet Identity login
  useEffect(() => {
    // Wait for identity initialization before redirecting
    if (isInitializing) return;

    const adminEmail = sessionStorage.getItem('adminEmail');
    if (!adminEmail || adminEmail !== 'kumarrishit1010@gmail.com') {
      navigate({ to: '/admin-login' });
      return;
    }

    // Must be authenticated via Internet Identity
    if (!identity) {
      navigate({ to: '/admin-login' });
      return;
    }

    setIsAuthorized(true);
  }, [navigate, identity, isInitializing]);

  // Only enable queries when actor is fully ready (isReady), user is authorized, and actor is non-null
  const actorReady = isAuthorized && isReady && !!actor && !!identity;

  const { data: registrations, isLoading, refetch } = useGetAllRegistrations(sortBy, actorReady);
  const deleteMutation = useDeleteRegistration();
  const setApprovalMutation = useSetApproval();

  const handleLogout = () => {
    sessionStorage.removeItem('adminEmail');
    navigate({ to: '/admin-login' });
  };

  const handleAction = async () => {
    if (!actionId || !actionType) return;

    try {
      if (actionType === 'delete') {
        await deleteMutation.mutateAsync(actionId);
        toast.success('Registration deleted successfully');
      } else if (actionType === 'approve' && actionPrincipal) {
        await setApprovalMutation.mutateAsync({
          userPrincipal: actionPrincipal,
          status: ApprovalStatus.approved,
        });
        toast.success('Registration approved successfully');
      } else if (actionType === 'reject' && actionPrincipal) {
        await setApprovalMutation.mutateAsync({
          userPrincipal: actionPrincipal,
          status: ApprovalStatus.rejected,
        });
        toast.success('Registration rejected successfully');
      }
      setActionId(null);
      setActionType(null);
      setActionPrincipal(null);
    } catch (error) {
      console.error('Action error:', error);
      toast.error(`Failed to ${actionType} registration`);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const openActionDialog = (id: string, type: ActionType, principal: string) => {
    setActionId(id);
    setActionType(type);
    setActionPrincipal(principal);
  };

  const closeActionDialog = () => {
    setActionId(null);
    setActionType(null);
    setActionPrincipal(null);
  };

  const getStatusBadge = (status: RegistrationStatus) => {
    switch (status) {
      case RegistrationStatus.approved:
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case RegistrationStatus.deleted:
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Deleted
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPaymentBadge = (hasPaid: boolean) => {
    if (hasPaid) {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <IndianRupee className="w-3 h-3 mr-1" />
          Paid
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
        Unpaid
      </Badge>
    );
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Show loading while:
  // 1. Identity is still initializing
  // 2. User is authorized but actor is not yet ready
  if (isInitializing || (isAuthorized && !isReady)) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-lg font-medium text-muted-foreground">
            {isInitializing ? 'Checking authentication...' : 'Initializing admin session...'}
          </p>
          <p className="text-sm text-muted-foreground">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  // Safe list — always an array
  const safeRegistrations = Array.isArray(registrations) ? registrations : [];

  // Filter registrations based on search term
  const filteredRegistrations = safeRegistrations.filter((reg) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      reg.fullName.toLowerCase().includes(searchLower) ||
      reg.email.toLowerCase().includes(searchLower) ||
      reg.gender.toLowerCase().includes(searchLower) ||
      reg.schoolName.toLowerCase().includes(searchLower) ||
      reg.mobileNumber.toLowerCase().includes(searchLower) ||
      reg.classLevel.toLowerCase().includes(searchLower)
    );
  });

  const totalCount = safeRegistrations.length;
  const approvedCount = safeRegistrations.filter((r) => r.status === RegistrationStatus.approved).length;
  const paidCount = safeRegistrations.filter((r) => r.hasPaid).length;

  const getActionDialogContent = () => {
    switch (actionType) {
      case 'delete':
        return {
          title: 'Delete Registration',
          description: 'Are you sure you want to delete this registration? This action will mark the registration as deleted and the student will lose access to study materials.',
          confirmText: 'Delete',
          confirmClass: 'bg-destructive hover:bg-destructive/90',
        };
      case 'approve':
        return {
          title: 'Approve Registration',
          description: 'Are you sure you want to approve this registration? The student will be granted access to the platform.',
          confirmText: 'Approve',
          confirmClass: 'bg-green-600 hover:bg-green-700',
        };
      case 'reject':
        return {
          title: 'Reject Registration',
          description: 'Are you sure you want to reject this registration? The student will lose access to the platform.',
          confirmText: 'Reject',
          confirmClass: 'bg-destructive hover:bg-destructive/90',
        };
      default:
        return {
          title: 'Confirm Action',
          description: 'Are you sure?',
          confirmText: 'Confirm',
          confirmClass: '',
        };
    }
  };

  const dialogContent = getActionDialogContent();
  const isActionPending = deleteMutation.isPending || setApprovalMutation.isPending;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage student registrations</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Registrations</CardDescription>
            <CardTitle className="text-3xl">{totalCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Approved</CardDescription>
            <CardTitle className="text-3xl text-green-600">{approvedCount}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Paid</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{paidCount}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Registrations Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Registrations</CardTitle>
              <CardDescription>
                {filteredRegistrations.length} of {totalCount} registrations
              </CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search registrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="timestamp">Date</SelectItem>
                  <SelectItem value="fullName">Name</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading registrations...</span>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {searchTerm ? 'No registrations match your search.' : 'No registrations found.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-medium">{reg.fullName}</TableCell>
                      <TableCell>{reg.mobileNumber}</TableCell>
                      <TableCell>{reg.email}</TableCell>
                      <TableCell>{reg.gender}</TableCell>
                      <TableCell>{reg.schoolName}</TableCell>
                      <TableCell>{reg.classLevel}</TableCell>
                      <TableCell>{getStatusBadge(reg.status)}</TableCell>
                      <TableCell>{getPaymentBadge(reg.hasPaid)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(reg.timestamp)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => openActionDialog(reg.id, 'approve', reg.owner.toString())}
                            disabled={isActionPending}
                            title="Approve"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                            onClick={() => openActionDialog(reg.id, 'reject', reg.owner.toString())}
                            disabled={isActionPending}
                            title="Reject"
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => openActionDialog(reg.id, 'delete', reg.owner.toString())}
                            disabled={isActionPending}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!actionId} onOpenChange={(open) => !open && closeActionDialog()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
            <AlertDialogDescription>{dialogContent.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isActionPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAction}
              disabled={isActionPending}
              className={dialogContent.confirmClass}
            >
              {isActionPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                dialogContent.confirmText
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

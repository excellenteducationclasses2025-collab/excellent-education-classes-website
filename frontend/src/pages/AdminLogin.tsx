import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

const ADMIN_EMAIL = 'kumarrishit1010@gmail.com';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, loginStatus, identity, isInitializing } = useInternetIdentity();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.toLowerCase().trim();
    if (trimmedEmail !== ADMIN_EMAIL.toLowerCase()) {
      setError('Access denied. Only the authorized admin email can access the dashboard.');
      return;
    }

    setIsLoading(true);

    try {
      // If not already authenticated with Internet Identity, trigger login
      if (!identity) {
        await login();
      }

      // Store admin email in sessionStorage for UI checks
      sessionStorage.setItem('adminEmail', trimmedEmail);
      navigate({ to: '/admin' });
    } catch (err) {
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const isProcessing = isLoading || loginStatus === 'logging-in' || isInitializing;

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your authorized admin email and authenticate to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isProcessing}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {loginStatus === 'logging-in' ? 'Authenticating...' : 'Verifying...'}
                </>
              ) : (
                'Access Dashboard'
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              You will be prompted to authenticate with your identity provider.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

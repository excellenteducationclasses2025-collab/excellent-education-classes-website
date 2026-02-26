import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActorReady } from './useActorReady';
import type { Registration, ApprovalStatus } from '@/backend';
import { ExternalBlob } from '@/backend';
import { Principal } from '@icp-sdk/core/principal';

export function useGetAllRegistrations(sortBy: string = 'timestamp', isAuthorized: boolean = false) {
  const { actor, isReady } = useActorReady();

  return useQuery<Registration[]>({
    queryKey: ['registrations', 'all', sortBy],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');

      try {
        const registrations = await actor.getAllRegistrations();

        if (!registrations) {
          return [];
        }

        const sorted = [...registrations].sort((a, b) => {
          if (sortBy === 'fullName') {
            return a.fullName.localeCompare(b.fullName);
          }
          return Number(b.timestamp - a.timestamp);
        });

        return sorted;
      } catch (error) {
        return [];
      }
    },
    enabled: isReady && !!actor && isAuthorized,
    retry: false,
    staleTime: 10000,
    refetchOnWindowFocus: false,
  });
}

export function useGetRegistrationsByFilter(filterText: string, isAuthorized: boolean = false) {
  const { actor, isReady } = useActorReady();

  return useQuery<Registration[]>({
    queryKey: ['registrations', 'filter', filterText],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      if (!filterText.trim()) return [];
      try {
        const registrations = await actor.getAllRegistrations();

        if (!registrations) {
          return [];
        }

        const lowerFilter = filterText.toLowerCase();
        return registrations.filter(
          (reg) =>
            reg.fullName.toLowerCase().includes(lowerFilter) ||
            reg.email.toLowerCase().includes(lowerFilter) ||
            reg.gender.toLowerCase().includes(lowerFilter) ||
            reg.schoolName.toLowerCase().includes(lowerFilter) ||
            reg.mobileNumber.toLowerCase().includes(lowerFilter) ||
            reg.classLevel.toLowerCase().includes(lowerFilter)
        );
      } catch {
        return [];
      }
    },
    enabled: isReady && !!actor && !!filterText.trim() && isAuthorized,
    retry: false,
  });
}

export function useSubmitRegistration() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      fullName: string;
      mobileNumber: string;
      email: string;
      gender: string;
      schoolName: string;
      classLevel: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitRegistration(
        data.fullName,
        data.mobileNumber,
        data.email,
        data.gender,
        data.schoolName,
        data.classLevel
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
      queryClient.invalidateQueries({ queryKey: ['myRegistration'] });
      queryClient.invalidateQueries({ queryKey: ['hasCallerPaid'] });
    },
  });
}

export function useSetApproval() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userPrincipal, status }: { userPrincipal: string; status: ApprovalStatus }) => {
      if (!actor) return;
      const principal = Principal.fromText(userPrincipal);
      return actor.setApproval(principal, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
      queryClient.invalidateQueries({ queryKey: ['approvals'] });
    },
  });
}

export function useDeleteRegistration() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) return;
      return actor.deleteRegistration(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
    },
  });
}

export function useGetMyRegistration() {
  const { actor, isReady } = useActorReady();

  return useQuery<Registration | null>({
    queryKey: ['myRegistration'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.getRegistrationByOwner();
      } catch {
        return null;
      }
    },
    enabled: isReady && !!actor,
    retry: false,
  });
}

export function useUpdateRegistration() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      fullName: string;
      mobileNumber: string;
      email: string;
      gender: string;
      schoolName: string;
      classLevel: string;
    }) => {
      if (!actor) return;
      return actor.updateRegistration(
        data.fullName,
        data.mobileNumber,
        data.email,
        data.gender,
        data.schoolName,
        data.classLevel
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
      queryClient.invalidateQueries({ queryKey: ['myRegistration'] });
    },
  });
}

export function useCanAccessRestrictedContent() {
  const { actor, isReady } = useActorReady();

  return useQuery<boolean>({
    queryKey: ['canAccessRestrictedContent'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        const registration = await actor.getRegistrationByOwner();
        if (!registration) return false;
        return registration.status === 'approved';
      } catch {
        return false;
      }
    },
    enabled: isReady && !!actor,
  });
}

export function useConfirmMyPayment() {
  const { actor } = useActorReady();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      return actor.confirmPayment();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myRegistration'] });
      queryClient.invalidateQueries({ queryKey: ['hasCallerPaid'] });
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
      queryClient.invalidateQueries({ queryKey: ['canAccessRestrictedContent'] });
    },
  });
}

export function useHasCallerPaid() {
  const { actor, isReady } = useActorReady();

  return useQuery<boolean>({
    queryKey: ['hasCallerPaid'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.hasPaidForContent();
      } catch {
        return false;
      }
    },
    enabled: isReady && !!actor,
    retry: false,
  });
}

export function useGetAdvancePdf() {
  const { actor, isReady } = useActorReady();

  return useQuery<ExternalBlob | null>({
    queryKey: ['advancePdf'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.getAdvancePdf();
      } catch {
        return null;
      }
    },
    enabled: isReady && !!actor,
    retry: false,
  });
}

export function useGetContemporaryIndiaPdf() {
  const { actor, isReady } = useActorReady();

  return useQuery<ExternalBlob | null>({
    queryKey: ['contemporaryIndiaPdf'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.getContemporaryIndiaPdf();
      } catch {
        return null;
      }
    },
    enabled: isReady && !!actor,
    retry: false,
  });
}

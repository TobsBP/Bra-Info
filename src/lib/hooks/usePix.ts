import { useQuery } from '@tanstack/react-query';
import { fetchPixParticipants } from '@/lib/api/pix';

export const pixQueryKey = ['pix'] as const;

export function usePixParticipants() {
	return useQuery({
		queryKey: pixQueryKey,
		queryFn: fetchPixParticipants,
		staleTime: 1000 * 60 * 60 * 24, // 1 day
	});
}

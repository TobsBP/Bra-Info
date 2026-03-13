import { useQuery } from '@tanstack/react-query';
import { fetchBanks } from '@/lib/api/banks';

export const banksQueryKey = ['banks'] as const;

export function useBanks() {
	return useQuery({
		queryKey: banksQueryKey,
		queryFn: fetchBanks,
		staleTime: Infinity,
	});
}

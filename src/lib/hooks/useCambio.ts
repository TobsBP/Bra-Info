import { useQuery } from '@tanstack/react-query';
import { fetchCambio } from '@/lib/api/cambio';

export const cambioQueryKey = ['cambio'] as const;

export function useCambio() {
	return useQuery({
		queryKey: cambioQueryKey,
		queryFn: fetchCambio,
		staleTime: 1000 * 60 * 15, // 15 min
	});
}

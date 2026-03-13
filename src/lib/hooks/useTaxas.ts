import { useQuery } from '@tanstack/react-query';
import { fetchTaxas } from '@/lib/api/taxas';

export const taxasQueryKey = ['taxas'] as const;

export function useTaxas() {
	return useQuery({
		queryKey: taxasQueryKey,
		queryFn: fetchTaxas,
		staleTime: 1000 * 60 * 60 * 24, // 1 day
	});
}

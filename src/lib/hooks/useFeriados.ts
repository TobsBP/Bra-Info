import { useQuery } from '@tanstack/react-query';
import { fetchFeriados } from '@/lib/api/feriados';

export function useFeriados(year: number) {
	return useQuery({
		queryKey: ['feriados', year],
		queryFn: () => fetchFeriados(year),
		staleTime: Infinity,
	});
}

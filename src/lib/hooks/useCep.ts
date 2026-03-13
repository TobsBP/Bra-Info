import { useQuery } from '@tanstack/react-query';
import { fetchCep } from '@/lib/api/cep';

export function useCep(cep: string | null) {
	const cleaned = cep?.replace(/\D/g, '') ?? '';
	return useQuery({
		queryKey: ['cep', cleaned],
		queryFn: () => fetchCep(cleaned),
		enabled: cleaned.length === 8,
		staleTime: 1000 * 60 * 60, // 1h
	});
}

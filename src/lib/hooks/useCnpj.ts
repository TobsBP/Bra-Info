import { useQuery } from '@tanstack/react-query';
import { fetchCnpj } from '@/lib/api/cnpj';

export function useCnpj(cnpj: string | null) {
	const cleaned = cnpj?.replace(/\D/g, '') ?? '';
	return useQuery({
		queryKey: ['cnpj', cleaned],
		queryFn: () => fetchCnpj(cleaned),
		enabled: cleaned.length === 14,
		staleTime: 1000 * 60 * 60, // 1h
	});
}

import { useQuery } from '@tanstack/react-query';

async function fetchVehicleImages(query: string): Promise<string[]> {
	const params = new URLSearchParams({ q: query });
	const res = await fetch(`/api/fipe/image-search?${params}`);
	if (!res.ok) return [];
	const data = await res.json();
	return data.images ?? [];
}

export function useVehicleImageSearch(query: string) {
	return useQuery({
		queryKey: ['fipe', 'image-search', query],
		queryFn: () => fetchVehicleImages(query),
		staleTime: Infinity,
		enabled: !!query,
	});
}

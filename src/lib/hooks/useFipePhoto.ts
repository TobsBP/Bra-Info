import { useQuery } from '@tanstack/react-query';

async function fetchFipePhoto(
	make: string,
	model: string,
	year: number,
): Promise<string | null> {
	const params = new URLSearchParams({ make, model, year: String(year) });
	const res = await fetch(`/api/fipe/photo?${params}`);
	if (!res.ok) return null;
	const data = await res.json();
	return data.imageUrl ?? null;
}

export function useFipePhoto(make: string, model: string, year: number) {
	return useQuery({
		queryKey: ['fipe', 'photo', make, model, year],
		queryFn: () => fetchFipePhoto(make, model, year),
		staleTime: Infinity,
		enabled: !!make && !!model && year > 0,
	});
}

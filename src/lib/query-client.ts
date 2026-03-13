import { QueryClient } from '@tanstack/react-query';

let queryClient: QueryClient | undefined;

export function getQueryClient(): QueryClient {
	if (!queryClient) {
		queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					staleTime: 1000 * 60 * 5, // default 5 min
					retry: 1,
				},
			},
		});
	}
	return queryClient;
}

import { type Taxa, taxasArraySchema } from '@/lib/schemas/taxa.schema';
import { brasilApiClient } from './client';

export async function fetchTaxas(): Promise<Taxa[]> {
	const { data } = await brasilApiClient.get('/taxas');
	return taxasArraySchema.parse(data);
}

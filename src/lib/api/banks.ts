import { type Bank, banksSchema } from '@/lib/schemas/bank.schema';
import { brasilApiClient } from './client';

export async function fetchBanks(): Promise<Bank[]> {
	const { data } = await brasilApiClient.get('/banks');
	return banksSchema.parse(data);
}

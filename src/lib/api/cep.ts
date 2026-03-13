import { type CepData, cepSchema } from '@/lib/schemas/cep.schema';
import { brasilApiClient } from './client';

export async function fetchCep(cep: string): Promise<CepData> {
	const cleaned = cep.replace(/\D/g, '');
	const { data } = await brasilApiClient.get(`/cep/${cleaned}`);
	return cepSchema.parse(data);
}

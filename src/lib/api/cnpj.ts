import { type CnpjData, cnpjSchema } from '@/lib/schemas/cnpj.schema';
import { brasilApiClient } from './client';

export async function fetchCnpj(cnpj: string): Promise<CnpjData> {
	const cleaned = cnpj.replace(/\D/g, '');
	const { data } = await brasilApiClient.get(`/cnpj/${cleaned}`);
	return cnpjSchema.parse(data);
}

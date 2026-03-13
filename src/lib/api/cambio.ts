import {
	type CambioRate,
	cambioArraySchema,
} from '@/lib/schemas/cambio.schema';
import { brasilApiClient } from './client';

export async function fetchCambio(): Promise<CambioRate[]> {
	const { data } = await brasilApiClient.get('/cambio');
	return cambioArraySchema.parse(data);
}

import {
	type Feriado,
	feriadosArraySchema,
} from '@/lib/schemas/feriado.schema';
import { brasilApiClient } from './client';

export async function fetchFeriados(year: number): Promise<Feriado[]> {
	const { data } = await brasilApiClient.get(`/feriados/${year}`);
	return feriadosArraySchema.parse(data);
}

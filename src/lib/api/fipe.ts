import { z } from 'zod';
import {
	type FipeAno,
	type FipeMarca,
	type FipeModelosResponse,
	type FipePreco,
	fipeAnoSchema,
	fipeMarcaSchema,
	fipeModelosResponseSchema,
	fipePrecoSchema,
} from '@/lib/schemas/fipe.schema';
import { brasilApiClient } from './client';

export async function fetchFipeMarcas(tipo: string): Promise<FipeMarca[]> {
	const { data } = await brasilApiClient.get(`/fipe/marcas/${tipo}`);
	return z.array(fipeMarcaSchema).parse(data);
}

export async function fetchFipeModelos(
	tipo: string,
	marca: string,
): Promise<FipeModelosResponse> {
	const { data } = await brasilApiClient.get(`/fipe/modelos/${tipo}/${marca}`);
	return fipeModelosResponseSchema.parse(data);
}

export async function fetchFipeAnos(
	tipo: string,
	marca: string,
	modelo: string,
): Promise<FipeAno[]> {
	const { data } = await brasilApiClient.get(
		`/fipe/anos/${tipo}/${marca}/${modelo}`,
	);
	return z.array(fipeAnoSchema).parse(data);
}

export async function fetchFipePrecoWizard(
	tipo: string,
	marca: string,
	modelo: string,
	ano: string,
): Promise<FipePreco> {
	const { data } = await brasilApiClient.get(
		`/fipe/detalhes/${tipo}/${marca}/${modelo}/${ano}`,
	);
	return fipePrecoSchema.parse(data);
}

// BrasilAPI direct code lookup — returns array of results per reference month
export async function fetchFipePreco(codigo: string): Promise<FipePreco[]> {
	const { data } = await brasilApiClient.get(`/fipe/preco/${codigo}`);
	return z.array(fipePrecoSchema).parse(data);
}

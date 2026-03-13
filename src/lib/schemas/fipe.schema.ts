import { z } from 'zod';

// Parallelum: [{codigo: string, nome: string}]
export const fipeMarcaSchema = z.object({
	codigo: z.string(),
	nome: z.string(),
});

// Parallelum modelos item: {codigo: number, nome: string}
export const fipeModeloItemSchema = z.object({
	codigo: z.number(),
	nome: z.string(),
});

// Parallelum anos item: {codigo: string, nome: string}
export const fipeAnoSchema = z.object({
	codigo: z.string(),
	nome: z.string(),
});

// Parallelum modelos response: {modelos: [...], anos: [...]}
export const fipeModelosResponseSchema = z.object({
	modelos: z.array(fipeModeloItemSchema),
	anos: z.array(fipeAnoSchema),
});

// Normalized camelCase price — used by BrasilAPI direct lookup and Parallelum wizard
export const fipePrecoSchema = z.object({
	valor: z.string(),
	marca: z.string(),
	modelo: z.string(),
	anoModelo: z.number(),
	combustivel: z.string(),
	codigoFipe: z.string(),
	mesReferencia: z.string(),
	tipoVeiculo: z.number(),
	siglaCombustivel: z.string(),
	dataConsulta: z.string().optional(),
});

export type FipeMarca = z.infer<typeof fipeMarcaSchema>;
export type FipeModeloItem = z.infer<typeof fipeModeloItemSchema>;
export type FipeAno = z.infer<typeof fipeAnoSchema>;
export type FipeModelosResponse = z.infer<typeof fipeModelosResponseSchema>;
export type FipePreco = z.infer<typeof fipePrecoSchema>;

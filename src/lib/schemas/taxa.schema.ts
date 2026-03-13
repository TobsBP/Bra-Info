import { z } from 'zod';

export const taxaSchema = z.object({
	nome: z.string(),
	valor: z.number(),
});

export type Taxa = z.infer<typeof taxaSchema>;
export const taxasArraySchema = z.array(taxaSchema);

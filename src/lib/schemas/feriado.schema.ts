import { z } from 'zod';

export const feriadoSchema = z.object({
	date: z.string(),
	name: z.string(),
	type: z.string(),
});

export type Feriado = z.infer<typeof feriadoSchema>;
export const feriadosArraySchema = z.array(feriadoSchema);

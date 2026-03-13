import { z } from 'zod';

export const cepLocationSchema = z.object({
	type: z.string().optional(),
	coordinates: z
		.object({
			longitude: z.string().optional(),
			latitude: z.string().optional(),
		})
		.optional(),
});

export const cepSchema = z.object({
	cep: z.string(),
	state: z.string(),
	city: z.string(),
	neighborhood: z.string().optional().nullable(),
	street: z.string().optional().nullable(),
	service: z.string().optional(),
	location: cepLocationSchema.optional(),
});

export type CepData = z.infer<typeof cepSchema>;

export const cepInputSchema = z.object({
	cep: z
		.string()
		.min(1, 'CEP obrigatório')
		.transform((v) => v.replace(/\D/g, ''))
		.refine((v) => v.length === 8, 'CEP deve ter 8 dígitos'),
});

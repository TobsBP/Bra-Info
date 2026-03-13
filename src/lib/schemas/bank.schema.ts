import { z } from 'zod';

export const bankSchema = z.object({
	ispb: z.string(),
	name: z.string(),
	code: z.number().nullable().optional(),
	fullName: z.string(),
});

export type Bank = z.infer<typeof bankSchema>;
export const banksSchema = z.array(bankSchema);

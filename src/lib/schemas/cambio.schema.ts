import { z } from 'zod';

export const cambioSchema = z.object({
	symbol: z.string(),
	currencyCode: z.string(),
	currencyName: z.string(),
	bid: z.string(),
	ask: z.string(),
	notes: z.string().optional().nullable(),
	datetime: z.string(),
	source: z.string().optional(),
	timestamp: z.number().optional(),
	high: z.string().optional(),
	low: z.string().optional(),
	varBid: z.string().optional(),
	pctChange: z.string().optional(),
});

export type CambioRate = z.infer<typeof cambioSchema>;
export const cambioArraySchema = z.array(cambioSchema);

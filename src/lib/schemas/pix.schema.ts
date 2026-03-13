import { z } from 'zod';

export const pixParticipantSchema = z.object({
	ispb: z.string(),
	cnpj: z.string().optional(),
	nome: z.string(),
	nome_reduzido: z.string().optional(),
	modalidade_participacao: z.string().optional(),
	tipo_participacao: z.string().optional(),
	inicio_operacao: z.string().optional(),
});

export type PixParticipant = z.infer<typeof pixParticipantSchema>;
export const pixArraySchema = z.array(pixParticipantSchema);

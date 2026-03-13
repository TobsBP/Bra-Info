import { z } from 'zod';

function validateCnpj(cnpj: string): boolean {
	const stripped = cnpj.replace(/\D/g, '');
	if (stripped.length !== 14) return false;
	if (/^(\d)\1+$/.test(stripped)) return false;

	const calc = (weights: number[]) =>
		weights.reduce((sum, w, i) => sum + parseInt(stripped[i], 10) * w, 0);

	const mod = (n: number) => {
		const r = n % 11;
		return r < 2 ? 0 : 11 - r;
	};

	const d1 = mod(calc([5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]));
	const d2 = mod(calc([6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]));

	return parseInt(stripped[12], 10) === d1 && parseInt(stripped[13], 10) === d2;
}

export const cnpjInputSchema = z.object({
	cnpj: z
		.string()
		.min(1, 'CNPJ obrigatório')
		.transform((v) => v.replace(/\D/g, ''))
		.refine((v) => v.length === 14, 'CNPJ deve ter 14 dígitos')
		.refine(validateCnpj, 'CNPJ inválido'),
});

const atividadeSchema = z.object({
	codigo: z.string(),
	descricao: z.string(),
});

const socioSchema = z.object({
	nome: z.string(),
	qualificacao_socio: z.string().optional(),
	cnpj_cpf_do_socio: z.string().optional(),
	pais: z.string().optional().nullable(),
	faixa_etaria: z.string().optional().nullable(),
	data_entrada_sociedade: z.string().optional().nullable(),
});

export const cnpjSchema = z.object({
	cnpj: z.string(),
	razao_social: z.string(),
	nome_fantasia: z.string().optional().nullable(),
	tipo: z.string().optional(),
	porte: z.string().optional().nullable(),
	natureza_juridica: z.string().optional(),
	situacao_cadastral: z.string().optional(),
	data_situacao_cadastral: z.string().optional().nullable(),
	data_inicio_atividade: z.string().optional().nullable(),
	cnae_fiscal: z.number().optional(),
	cnae_fiscal_descricao: z.string().optional(),
	cnaes_secundarios: z.array(atividadeSchema).optional().default([]),
	logradouro: z.string().optional().nullable(),
	numero: z.string().optional().nullable(),
	complemento: z.string().optional().nullable(),
	bairro: z.string().optional().nullable(),
	municipio: z.string().optional().nullable(),
	uf: z.string().optional().nullable(),
	cep: z.string().optional().nullable(),
	ddd_telefone_1: z.string().optional().nullable(),
	email: z.string().optional().nullable(),
	capital_social: z.number().optional().nullable(),
	// Tax info
	opcao_pelo_simples: z.boolean().optional().nullable(),
	data_opcao_pelo_simples: z.string().optional().nullable(),
	data_exclusao_do_simples: z.string().optional().nullable(),
	opcao_pelo_mei: z.boolean().optional().nullable(),
	data_opcao_pelo_mei: z.string().optional().nullable(),
	data_exclusao_do_mei: z.string().optional().nullable(),
	// Extra info
	ente_federativo_responsavel: z.string().optional().nullable(),
	qualificacao_do_responsavel: z.number().optional().nullable(),
	codigo_natureza_juridica: z.number().optional().nullable(),
	codigo_porte: z.number().optional().nullable(),
	descricao_situacao_cadastral: z.string().optional().nullable(),
	codigo_situacao_cadastral: z.number().optional().nullable(),
	qsa: z.array(socioSchema).optional().default([]),
});

export type CnpjData = z.infer<typeof cnpjSchema>;
export type Socio = z.infer<typeof socioSchema>;

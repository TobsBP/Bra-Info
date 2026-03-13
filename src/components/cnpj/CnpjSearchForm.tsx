'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Briefcase, HelpCircle, Info, MapPin, Receipt, Users } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useCnpj } from '@/lib/hooks/useCnpj';
import { formatCnpj, formatCurrency } from '@/lib/utils';

const schema = z.object({
	cnpj: z.string().min(1, 'CNPJ obrigatório'),
});

type FormData = z.infer<typeof schema>;

export function CnpjSearchForm() {
	const [activeCnpj, setActiveCnpj] = useState<string | null>(null);
	const { data, isLoading, error } = useCnpj(activeCnpj);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormData) => setActiveCnpj(data.cnpj);

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Briefcase className="w-5 h-5" />
						Consultar CNPJ
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
						<div className="flex-1">
							<Input
								placeholder="Ex: 33.000.167/0001-01"
								{...register('cnpj')}
							/>
							{errors.cnpj && (
								<p className="text-xs text-[hsl(var(--destructive))] mt-1">
									{errors.cnpj.message}
								</p>
							)}
						</div>
						<Button type="submit">Buscar</Button>
					</form>
				</CardContent>
			</Card>

			{isLoading && <LoadingSkeleton rows={6} />}
			{error && <ErrorAlert message={error.message} />}

			{!data && !isLoading && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
					<Card className="bg-[hsl(var(--primary))]/5 border-[hsl(var(--primary))]/20">
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-bold flex items-center gap-2">
								<HelpCircle className="w-4 h-4 text-[hsl(var(--primary))]" />
								Você sabia?
							</CardTitle>
						</CardHeader>
						<CardContent className="text-sm space-y-3 text-[hsl(var(--muted-foreground))]">
							<p>
								O CNPJ tem 14 dígitos. O formato é <strong>00.000.000/0001-00</strong>.
							</p>
							<p>
								Os números após a barra (<strong>0001</strong>) indicam se é a <strong>Matriz</strong> ou uma <strong>Filial</strong>. Geralmente, 0001 é a sede principal.
							</p>
							<p>
								Os dois últimos dígitos são <strong>Verificadores</strong>, calculados matematicamente para evitar erros de digitação.
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-bold flex items-center gap-2">
								<Info className="w-4 h-4 text-[hsl(var(--primary))]" />
								Tipos de Empresa
							</CardTitle>
						</CardHeader>
						<CardContent className="text-sm space-y-2">
							<div className="flex justify-between items-center">
								<span className="font-medium">MEI</span>
								<span className="text-xs text-[hsl(var(--muted-foreground))]">Faturamento até R$ 81k/ano</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="font-medium">ME (Microempresa)</span>
								<span className="text-xs text-[hsl(var(--muted-foreground))]">Até R$ 360k/ano</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="font-medium">EPP</span>
								<span className="text-xs text-[hsl(var(--muted-foreground))]">Até R$ 4,8 milhões/ano</span>
							</div>
							<p className="text-[10px] pt-2 text-[hsl(var(--muted-foreground))] italic">
								* Valores baseados no Simples Nacional.
							</p>
						</CardContent>
					</Card>
				</div>
			)}

			{data && (
				<div className="space-y-4">
					{/* Summary */}
					<Card>
						<CardHeader>
							<CardTitle>{data.razao_social}</CardTitle>
							{data.nome_fantasia && (
								<p className="text-[hsl(var(--muted-foreground))] text-sm">
									{data.nome_fantasia}
								</p>
							)}
						</CardHeader>
						<CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{[
								{ label: 'CNPJ', value: formatCnpj(data.cnpj) },
								{ label: 'Situação', value: data.situacao_cadastral },
								{ label: 'Tipo', value: data.tipo },
								{ label: 'Porte', value: data.porte },
								{ label: 'Natureza Jurídica', value: data.natureza_juridica },
								{
									label: 'Início de Atividade',
									value: data.data_inicio_atividade,
								},
								{
									label: 'Capital Social',
									value:
										data.capital_social != null
											? formatCurrency(data.capital_social)
											: null,
								},
								{ label: 'Telefone', value: data.ddd_telefone_1 },
								{ label: 'Email', value: data.email },
							].map(({ label, value }) =>
								value ? (
									<div key={label}>
										<p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide font-medium">
											{label}
										</p>
										<p className="font-medium text-sm">{value}</p>
									</div>
								) : null,
							)}

							{/* Endereço */}
							{data.logradouro && (
								<div className="col-span-full">
									<p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide font-medium flex items-center gap-1">
										<MapPin className="w-3 h-3" /> Endereço
									</p>
									<p className="font-medium text-sm">
										{[
											data.logradouro,
											data.numero,
											data.complemento,
											data.bairro,
											data.municipio,
											data.uf,
										]
											.filter(Boolean)
											.join(', ')}
									</p>
								</div>
							)}
						</CardContent>
					</Card>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						{/* Tax Info */}
						<Card>
							<CardHeader>
								<CardTitle className="text-base flex items-center gap-2">
									<Receipt className="w-4 h-4" /> Regime Tributário
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between py-2 border-b last:border-0">
									<span className="text-sm font-medium">Simples Nacional</span>
									<Badge variant={data.opcao_pelo_simples ? 'default' : 'secondary'}>
										{data.opcao_pelo_simples ? 'Optante' : 'Não optante'}
									</Badge>
								</div>
								{data.opcao_pelo_simples && (
									<div className="text-xs text-[hsl(var(--muted-foreground))] flex justify-between px-1">
										<span>Início: {data.data_opcao_pelo_simples}</span>
										{data.data_exclusao_do_simples && (
											<span>Exclusão: {data.data_exclusao_do_simples}</span>
										)}
									</div>
								)}

								<div className="flex items-center justify-between py-2 border-b last:border-0">
									<span className="text-sm font-medium">MEI (Microempreendedor)</span>
									<Badge variant={data.opcao_pelo_mei ? 'default' : 'secondary'}>
										{data.opcao_pelo_mei ? 'Sim' : 'Não'}
									</Badge>
								</div>
								{data.opcao_pelo_mei && (
									<div className="text-xs text-[hsl(var(--muted-foreground))] flex justify-between px-1">
										<span>Início: {data.data_opcao_pelo_mei}</span>
										{data.data_exclusao_do_mei && (
											<span>Exclusão: {data.data_exclusao_do_mei}</span>
										)}
									</div>
								)}
							</CardContent>
						</Card>

						{/* Extra Info */}
						<Card>
							<CardHeader>
								<CardTitle className="text-base flex items-center gap-2">
									<Info className="w-4 h-4" /> Detalhes do Cadastro
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{[
									{ label: 'Natureza Jurídica', value: `${data.codigo_natureza_juridica} - ${data.natureza_juridica}` },
									{ label: 'Porte', value: `${data.codigo_porte} - ${data.porte}` },
									{ label: 'Ente Federativo', value: data.ente_federativo_responsavel },
									{ label: 'Situação', value: `${data.codigo_situacao_cadastral} - ${data.descricao_situacao_cadastral}` },
								].map(({ label, value }) =>
									value && !value.includes('null') ? (
										<div key={label} className="flex flex-col gap-1">
											<p className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase font-bold tracking-wider">
												{label}
											</p>
											<p className="text-sm">{value}</p>
										</div>
									) : null,
								)}
							</CardContent>
						</Card>
					</div>

					{/* Atividade principal */}
					{data.cnae_fiscal_descricao && (
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Atividade Principal</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex items-start gap-3">
									<Badge>{data.cnae_fiscal}</Badge>
									<p className="text-sm">{data.cnae_fiscal_descricao}</p>
								</div>
								{data.cnaes_secundarios.length > 0 && (
									<div className="mt-3 space-y-2">
										<p className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
											Atividades Secundárias
										</p>
										{data.cnaes_secundarios.slice(0, 5).map((c) => (
											<div key={c.codigo} className="flex items-start gap-3">
												<Badge variant="secondary">{c.codigo}</Badge>
												<p className="text-sm text-[hsl(var(--muted-foreground))]">
													{c.descricao}
												</p>
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					)}

					{/* QSA */}
					{data.qsa.length > 0 && (
						<Card>
							<CardHeader>
								<CardTitle className="text-base flex items-center gap-2">
									<Users className="w-4 h-4" /> Quadro de Sócios e
									Administradores
								</CardTitle>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Nome</TableHead>
											<TableHead>Qualificação</TableHead>
											<TableHead className="hidden sm:table-cell">
												Entrada
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{data.qsa.map((s) => (
											<TableRow key={s.cnpj_cpf_do_socio ?? s.nome}>
												<TableCell className="font-medium">{s.nome}</TableCell>
												<TableCell className="text-sm text-[hsl(var(--muted-foreground))]">
													{s.qualificacao_socio}
												</TableCell>
												<TableCell className="hidden sm:table-cell text-sm">
													{s.data_entrada_sociedade ?? '—'}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					)}
				</div>
			)}
		</div>
	);
}

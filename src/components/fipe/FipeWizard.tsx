'use client';

import {
	Bike,
	Calendar,
	Car,
	ChevronRight,
	Fuel,
	Gauge,
	ImageOff,
	RotateCcw,
	Search,
	Tag,
	Truck,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
	useFipeAnos,
	useFipeMarcas,
	useFipeModelos,
	useFipePreco,
	useFipePrecoWizard,
} from '@/lib/hooks/useFipe';
import { useFipePhoto } from '@/lib/hooks/useFipePhoto';
import { useVehicleImageSearch } from '@/lib/hooks/useVehicleImageSearch';
import type { FipePreco } from '@/lib/schemas/fipe.schema';
import { cn } from '@/lib/utils';

const TIPOS = [
	{
		value: 'carros',
		label: 'Carros',
		icon: Car,
		desc: 'Automóveis e utilitários',
	},
	{
		value: 'motos',
		label: 'Motos',
		icon: Bike,
		desc: 'Motocicletas e similares',
	},
	{
		value: 'caminhoes',
		label: 'Caminhões',
		icon: Truck,
		desc: 'Caminhões e ônibus',
	},
];

const FUEL_ICONS: Record<string, string> = {
	gasolina: '⛽',
	etanol: '🌿',
	flex: '⚡',
	diesel: '🔧',
	gnv: '💨',
	elétrico: '🔋',
};

function fuelEmoji(combustivel: string) {
	const key = combustivel.toLowerCase();
	for (const [k, v] of Object.entries(FUEL_ICONS)) {
		if (key.includes(k)) return v;
	}
	return '⛽';
}

type Step = 1 | 2 | 3 | 4 | 5;
const STEP_LABELS = ['Tipo', 'Marca', 'Modelo', 'Ano', 'Preço'];

function PrecoCard({ p }: { p: FipePreco }) {
	const photo = useFipePhoto(p.marca, p.modelo, p.anoModelo);

	return (
		<div className="rounded-2xl border overflow-hidden bg-[hsl(var(--card))] shadow-md">
			{/* Photo hero */}
			<div className="relative w-full h-56 bg-gradient-to-br from-[hsl(222,47%,13%)] to-[hsl(239,60%,20%)]">
				{photo.isLoading && (
					<div className="absolute inset-0 animate-pulse bg-[hsl(var(--muted))]" />
				)}
				{photo.data ? (
					<>
						<Image
							src={photo.data}
							alt={`${p.marca} ${p.modelo}`}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 700px"
						/>
						{/* gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
					</>
				) : (
					!photo.isLoading && (
						<div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/20">
							<ImageOff className="w-10 h-10" />
							<span className="text-xs">Imagem indisponível</span>
						</div>
					)
				)}

				{/* Brand + model overlaid on photo */}
				<div className="absolute bottom-0 left-0 right-0 p-4">
					<p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-0.5">
						{p.marca}
					</p>
					<p className="text-lg font-bold text-white leading-tight line-clamp-1">
						{p.modelo}
					</p>
				</div>
			</div>

			{/* Price + specs */}
			<div className="p-5 space-y-4">
				{/* Price row */}
				<div className="flex items-end justify-between">
					<div>
						<p className="text-xs text-[hsl(var(--muted-foreground))] uppercase tracking-wide font-medium mb-1">
							Valor de referência
						</p>
						<p className="text-3xl font-bold text-green-500 leading-none">
							{p.valor}
						</p>
					</div>
					<p className="text-xs text-[hsl(var(--muted-foreground))] pb-1">
						{p.mesReferencia}
					</p>
				</div>

				{/* Specs grid */}
				<div className="grid grid-cols-3 gap-3">
					{[
						{
							icon: Calendar,
							label: 'Ano',
							value: String(p.anoModelo),
						},
						{
							icon: Fuel,
							label: 'Combustível',
							value: `${fuelEmoji(p.combustivel)} ${p.siglaCombustivel}`,
						},
						{
							icon: Tag,
							label: 'Cód. FIPE',
							value: p.codigoFipe,
						},
					].map(({ icon: Icon, label, value }) => (
						<div
							key={label}
							className="flex flex-col gap-1 p-3 rounded-xl bg-[hsl(var(--muted))]/60"
						>
							<Icon className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
							<p className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wide font-medium">
								{label}
							</p>
							<p className="text-sm font-semibold truncate">{value}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export function FipeWizard() {
	const [step, setStep] = useState<Step>(1);
	const [tipo, setTipo] = useState('');
	const [marcaId, setMarcaId] = useState('');
	const [modeloId, setModeloId] = useState('');
	const [anoId, setAnoId] = useState('');
	const [search, setSearch] = useState('');

	const [inputCodigo, setInputCodigo] = useState('');
	const [codigoAtivo, setCodigoAtivo] = useState('');

	const [inputImagem, setInputImagem] = useState('');
	const [queryImagem, setQueryImagem] = useState('');
	const imageSearch = useVehicleImageSearch(queryImagem);

	const marcas = useFipeMarcas(tipo);
	const modelos = useFipeModelos(tipo, marcaId);
	const anos = useFipeAnos(tipo, marcaId, modeloId);
	const preco = useFipePrecoWizard(tipo, marcaId, modeloId, anoId);
	const precoDirecto = useFipePreco(codigoAtivo);

	const resetWizard = () => {
		setStep(1);
		setTipo('');
		setMarcaId('');
		setModeloId('');
		setAnoId('');
		setSearch('');
	};

	const filteredModelos = modelos.data?.modelos.filter((m) =>
		m.nome.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
			{/* Left column */}
			<div className="space-y-6">
				{/* Direct code lookup */}
				<Card>
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-base">
							<div className="p-1.5 rounded-lg bg-[hsl(var(--primary))]/10">
								<Search className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
							</div>
							Consultar por código FIPE
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex gap-2">
							<Input
								placeholder="Ex: 001004-9"
								value={inputCodigo}
								onChange={(e) => setInputCodigo(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' && inputCodigo.trim()) {
										setCodigoAtivo(inputCodigo.trim());
									}
								}}
								className="font-mono"
							/>
							<Button
								disabled={!inputCodigo.trim()}
								onClick={() => setCodigoAtivo(inputCodigo.trim())}
							>
								Consultar
							</Button>
						</div>

						{precoDirecto.isLoading && (
							<Skeleton className="h-72 w-full mt-4 rounded-2xl" />
						)}
						{precoDirecto.error && (
							<ErrorAlert message={precoDirecto.error.message} />
						)}
						{precoDirecto.data && precoDirecto.data.length > 0 && (
							<div className="mt-4 space-y-4">
								{precoDirecto.data.map((p) => (
									<PrecoCard key={`${p.codigoFipe}-${p.mesReferencia}`} p={p} />
								))}
							</div>
						)}
					</CardContent>
				</Card>

				{/* Image search */}
				<Card>
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-base">
							<div className="p-1.5 rounded-lg bg-[hsl(var(--primary))]/10">
								<Car className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
							</div>
							Buscar imagens do veículo
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex gap-2">
							<Input
								placeholder="Ex: Toyota Corolla, BMW M3, Fusca…"
								value={inputImagem}
								onChange={(e) => setInputImagem(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' && inputImagem.trim()) {
										setQueryImagem(inputImagem.trim());
									}
								}}
							/>
							<Button
								disabled={!inputImagem.trim()}
								onClick={() => setQueryImagem(inputImagem.trim())}
							>
								Buscar
							</Button>
						</div>

						{imageSearch.isLoading && (
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
								{Array.from({ length: 6 }, (_, i) => i).map((n) => (
									<Skeleton key={n} className="h-36 w-full rounded-xl" />
								))}
							</div>
						)}

						{imageSearch.data && imageSearch.data.length > 0 && (
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
								{imageSearch.data.map((url, i) => (
									<a
										key={url}
										href={url}
										target="_blank"
										rel="noopener noreferrer"
										className="relative h-36 rounded-xl overflow-hidden block group border hover:border-[hsl(var(--primary))]/40 transition-colors"
									>
										<Image
											src={url}
											alt={`${queryImagem} ${i + 1}`}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-300"
											sizes="(max-width: 640px) 50vw, 33vw"
										/>
									</a>
								))}
							</div>
						)}

						{imageSearch.data &&
							imageSearch.data.length === 0 &&
							!imageSearch.isLoading &&
							queryImagem && (
								<p className="text-sm text-[hsl(var(--muted-foreground))] text-center py-4">
									Nenhuma imagem encontrada para "{queryImagem}"
								</p>
							)}
					</CardContent>
				</Card>
			</div>
			{/* end left column */}

			{/* Right column — 5-step wizard */}
			<Card>
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="flex items-center gap-2 text-base">
							<div className="p-1.5 rounded-lg bg-[hsl(var(--primary))]/10">
								<Gauge className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
							</div>
							Explorar modelos
						</CardTitle>
						<Button
							variant="ghost"
							size="icon"
							onClick={resetWizard}
							className="h-8 w-8 text-[hsl(var(--muted-foreground))]"
							title="Recomeçar"
						>
							<RotateCcw className="w-3.5 h-3.5" />
						</Button>
					</div>

					{/* Step progress */}
					<div className="flex items-center gap-1.5 mt-4">
						{STEP_LABELS.map((s, i) => {
							const n = (i + 1) as Step;
							const active = step === n;
							const done = step > n;
							return (
								<div key={s} className="flex items-center gap-1.5">
									<div className="flex items-center gap-1.5">
										<div
											className={cn(
												'flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold transition-all',
												done
													? 'bg-green-500 text-white'
													: active
														? 'bg-[hsl(var(--primary))] text-white shadow-md shadow-[hsl(var(--primary))]/30'
														: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]',
											)}
										>
											{done ? '✓' : n}
										</div>
										<span
											className={cn(
												'text-xs hidden sm:inline transition-colors',
												active
													? 'font-semibold text-[hsl(var(--foreground))]'
													: done
														? 'text-green-500 font-medium'
														: 'text-[hsl(var(--muted-foreground))]',
											)}
										>
											{s}
										</span>
									</div>
									{i < 4 && (
										<ChevronRight className="w-3 h-3 text-[hsl(var(--muted-foreground))]/40 shrink-0" />
									)}
								</div>
							);
						})}
					</div>
				</CardHeader>

				<CardContent className="space-y-4">
					{/* Step 1: Tipo */}
					{step === 1 && (
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
							{TIPOS.map((t) => {
								const Icon = t.icon;
								const selected = tipo === t.value;
								return (
									<button
										type="button"
										key={t.value}
										onClick={() => {
											setTipo(t.value);
											setMarcaId('');
											setModeloId('');
											setAnoId('');
											setSearch('');
											setStep(2);
										}}
										className={cn(
											'group flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-150 text-center',
											selected
												? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5'
												: 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/40 hover:bg-[hsl(var(--primary))]/5',
										)}
									>
										<div
											className={cn(
												'p-3 rounded-xl transition-colors',
												selected
													? 'bg-[hsl(var(--primary))] text-white'
													: 'bg-[hsl(var(--muted))] group-hover:bg-[hsl(var(--primary))]/10 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))]',
											)}
										>
											<Icon className="w-6 h-6" />
										</div>
										<div>
											<p className="font-semibold text-sm">{t.label}</p>
											<p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
												{t.desc}
											</p>
										</div>
									</button>
								);
							})}
						</div>
					)}

					{/* Step 2: Marca */}
					{step === 2 && (
						<div className="space-y-4">
							{marcas.isLoading && <Skeleton className="h-10 w-full" />}
							{marcas.error && <ErrorAlert message={marcas.error.message} />}
							{marcas.data && (
								<>
									<Select
										value={marcaId}
										onValueChange={(v) => {
											setMarcaId(v);
											setModeloId('');
											setAnoId('');
										}}
									>
										<SelectTrigger>
											<SelectValue placeholder="Selecione a marca…" />
										</SelectTrigger>
										<SelectContent>
											{marcas.data.map((m) => (
												<SelectItem key={m.codigo} value={m.codigo}>
													{m.nome}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<div className="flex gap-2">
										<Button variant="outline" onClick={() => setStep(1)}>
											Voltar
										</Button>
										<Button disabled={!marcaId} onClick={() => setStep(3)}>
											Ver modelos
										</Button>
									</div>
								</>
							)}
						</div>
					)}

					{/* Step 3: Modelo */}
					{step === 3 && (
						<div className="space-y-3">
							{modelos.isLoading && (
								<div className="space-y-2">
									{Array.from({ length: 5 }, (_, i) => i).map((n) => (
										<Skeleton key={n} className="h-10 w-full rounded-lg" />
									))}
								</div>
							)}
							{modelos.error && <ErrorAlert message={modelos.error.message} />}
							{modelos.data && (
								<>
									<div className="relative">
										<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
										<Input
											placeholder="Filtrar modelos…"
											value={search}
											onChange={(e) => setSearch(e.target.value)}
											className="pl-9"
										/>
									</div>
									<p className="text-xs text-[hsl(var(--muted-foreground))]">
										{filteredModelos?.length} modelos encontrados
									</p>
									<div className="max-h-[360px] overflow-y-auto space-y-1 pr-1">
										{filteredModelos?.map((m) => (
											<button
												type="button"
												key={m.codigo}
												onClick={() => {
													setModeloId(String(m.codigo));
													setAnoId('');
													setStep(4);
												}}
												className="w-full text-left px-4 py-2.5 rounded-lg border text-sm hover:bg-[hsl(var(--primary))]/5 hover:border-[hsl(var(--primary))]/30 hover:text-[hsl(var(--primary))] transition-all duration-100 flex items-center justify-between group"
											>
												<span>{m.nome}</span>
												<ChevronRight className="w-3.5 h-3.5 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] shrink-0" />
											</button>
										))}
									</div>
								</>
							)}
							<Button variant="outline" onClick={() => setStep(2)}>
								Voltar
							</Button>
						</div>
					)}

					{/* Step 4: Ano */}
					{step === 4 && (
						<div className="space-y-4">
							{anos.isLoading && <Skeleton className="h-10 w-full" />}
							{anos.error && <ErrorAlert message={anos.error.message} />}
							{anos.data && (
								<>
									<Select value={anoId} onValueChange={(v) => setAnoId(v)}>
										<SelectTrigger>
											<SelectValue placeholder="Selecione o ano…" />
										</SelectTrigger>
										<SelectContent>
											{anos.data.map((a) => (
												<SelectItem key={a.codigo} value={a.codigo}>
													{a.nome}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<div className="flex gap-2">
										<Button variant="outline" onClick={() => setStep(3)}>
											Voltar
										</Button>
										<Button disabled={!anoId} onClick={() => setStep(5)}>
											Ver preço
										</Button>
									</div>
								</>
							)}
						</div>
					)}

					{/* Step 5: Preço */}
					{step === 5 && (
						<div className="space-y-4">
							{preco.isLoading && (
								<Skeleton className="h-72 w-full rounded-2xl" />
							)}
							{preco.error && <ErrorAlert message={preco.error.message} />}
							{preco.data && <PrecoCard p={preco.data} />}
							<Button variant="outline" onClick={() => setStep(4)}>
								Voltar
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

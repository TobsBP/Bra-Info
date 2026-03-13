import { type NextRequest, NextResponse } from 'next/server';

const BASE =
	process.env.PARALLELUM_URL ?? 'https://parallelum.com.br/fipe/api/v1';

export async function GET(
	_req: NextRequest,
	{
		params,
	}: {
		params: Promise<{
			tipo: string;
			marca: string;
			modelo: string;
			ano: string;
		}>;
	},
) {
	const { tipo, marca, modelo, ano } = await params;
	const res = await fetch(
		`${BASE}/${tipo}/marcas/${marca}/modelos/${modelo}/anos/${ano}`,
		{
			next: { revalidate: 3600 },
		},
	);
	if (!res.ok)
		return NextResponse.json(
			{ error: 'Falha ao buscar preço' },
			{ status: res.status },
		);
	const d = await res.json();
	const normalized = {
		valor: d.Valor,
		marca: d.Marca,
		modelo: d.Modelo,
		anoModelo: d.AnoModelo,
		combustivel: d.Combustivel,
		codigoFipe: d.CodigoFipe,
		mesReferencia: d.MesReferencia,
		tipoVeiculo: d.TipoVeiculo,
		siglaCombustivel: d.SiglaCombustivel,
		dataConsulta: d.DataConsulta,
	};
	return NextResponse.json(normalized);
}

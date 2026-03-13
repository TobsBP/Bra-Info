import type { LucideIcon } from 'lucide-react';
import {
	Briefcase,
	Building2,
	CalendarDays,
	Car,
	LayoutDashboard,
	MapPin,
	Percent,
	QrCode,
	TrendingUp,
} from 'lucide-react';

export interface NavItem {
	title: string;
	href: string;
	icon: LucideIcon;
	description: string;
}

export const navItems: NavItem[] = [
	{
		title: 'Overview',
		href: '/',
		icon: LayoutDashboard,
		description: 'Painel geral com KPIs',
	},
	{
		title: 'Bancos',
		href: '/banks',
		icon: Building2,
		description: 'Lista de bancos brasileiros',
	},
	{
		title: 'CEP',
		href: '/cep',
		icon: MapPin,
		description: 'Consulta de CEP',
	},
	{
		title: 'CNPJ',
		href: '/cnpj',
		icon: Briefcase,
		description: 'Dados de empresas',
	},
	{
		title: 'Câmbio',
		href: '/cambio',
		icon: TrendingUp,
		description: 'Taxas de câmbio',
	},
	{
		title: 'Taxas',
		href: '/taxas',
		icon: Percent,
		description: 'Taxas de juros (SELIC, CDI…)',
	},
	{
		title: 'Feriados',
		href: '/feriados',
		icon: CalendarDays,
		description: 'Feriados nacionais',
	},
	{
		title: 'FIPE',
		href: '/fipe',
		icon: Car,
		description: 'Tabela FIPE de veículos',
	},
	{
		title: 'PIX',
		href: '/pix',
		icon: QrCode,
		description: 'Participantes PIX',
	},
];

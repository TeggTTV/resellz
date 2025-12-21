'use client';

import { motion } from 'framer-motion';
import { DollarSign, Tag, ShoppingBag, TrendingUp } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function DashboardStats() {
	const { items, sales } = useData();

	// Calculate Stats
	const totalProfit = sales.reduce((sum, sale) => sum + sale.netProfit, 0);
	const activeListings = items.filter(
		(item) => item.status === 'Available'
	).length;
	const itemsSold = sales.length;

	const totalRevenue = sales.reduce((sum, sale) => sum + sale.salePrice, 0);
	const avgMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

	// TODO: Calculate trends (change) by comparing to previous period (mocked for now)

	const stats = [
		{
			label: 'Total Profit',
			value: `$${totalProfit.toLocaleString(undefined, {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})}`,
			change: '+12.5%', // Mock trend
			trend: 'up',
			icon: DollarSign,
			color: 'text-emerald-400',
			bg: 'bg-emerald-400/10',
		},
		{
			label: 'Active Listings',
			value: activeListings.toString(),
			change: '+4', // Mock trend
			trend: 'up',
			icon: Tag,
			color: 'text-blue-400',
			bg: 'bg-blue-400/10',
		},
		{
			label: 'Items Sold',
			value: itemsSold.toString(),
			change: '+2', // Mock trend
			trend: 'up',
			icon: ShoppingBag,
			color: 'text-violet-400',
			bg: 'bg-violet-400/10',
		},
		{
			label: 'Avg. Margin',
			value: `${avgMargin.toFixed(1)}%`,
			change: '+2.1%', // Mock trend
			trend: 'up',
			icon: TrendingUp,
			color: 'text-amber-400',
			bg: 'bg-amber-400/10',
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{stats.map((stat, index) => (
				<motion.div
					key={stat.label}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
					className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
				>
					<div className="flex justify-between items-start mb-4">
						<div
							className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}
						>
							<stat.icon size={20} />
						</div>
						<div
							className={`text-xs font-semibold px-2 py-1 rounded-full ${
								stat.trend === 'up'
									? 'bg-emerald-500/20 text-emerald-400'
									: 'bg-red-500/20 text-red-400'
							}`}
						>
							{stat.change}
						</div>
					</div>
					<div>
						<h3 className="text-gray-400 text-sm font-medium mb-1">
							{stat.label}
						</h3>
						<div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform origin-left">
							{stat.value}
						</div>
					</div>
				</motion.div>
			))}
		</div>
	);
}

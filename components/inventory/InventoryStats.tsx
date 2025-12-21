'use client';

import { motion } from 'framer-motion';
import { Package, DollarSign, TrendingUp } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function InventoryStats() {
	const { items } = useData();

	// Calculate Stats for AVAILABLE items only
	const availableItems = items.filter((item) => item.status === 'Available');

	const totalValue = availableItems.reduce(
		(sum, item) => sum + (item.marketPrice || 0),
		0
	);
	const totalInvestment = availableItems.reduce(
		(sum, item) => sum + (item.purchasePrice || 0),
		0
	);
	const projectedProfit = totalValue - totalInvestment;
	const totalItems = availableItems.length;

	const stats = [
		{
			label: 'Total Inventory Value',
			value: `$${totalValue.toLocaleString(undefined, {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})}`,
			icon: DollarSign,
			color: 'text-emerald-400',
			bg: 'bg-emerald-400/10',
		},
		{
			label: 'Total Items In Stock',
			value: totalItems.toString(),
			icon: Package,
			color: 'text-blue-400',
			bg: 'bg-blue-400/10',
		},
		{
			label: 'Projected Profit',
			value: `$${projectedProfit.toLocaleString(undefined, {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})}`,
			icon: TrendingUp,
			color: 'text-amber-400',
			bg: 'bg-amber-400/10',
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
			{stats.map((stat, index) => (
				<motion.div
					key={stat.label}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
					className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
				>
					<div
						className={`w-12 h-12 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}
					>
						<stat.icon size={24} />
					</div>
					<div>
						<div className="text-sm text-gray-400">
							{stat.label}
						</div>
						<div className="text-xl font-bold text-white">
							{stat.value}
						</div>
					</div>
				</motion.div>
			))}
		</div>
	);
}

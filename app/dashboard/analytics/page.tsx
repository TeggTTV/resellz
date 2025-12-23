'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import RevenueChart from '@/components/analytics/RevenueChart';
import ExpensesBreakdown from '@/components/analytics/ExpensesBreakdown';
import CategoryPerformance from '@/components/analytics/CategoryPerformance';
import { useData } from '@/context/DataContext';

export default function AnalyticsPage() {
	const { items } = useData();

	const projectedProfit = useMemo(() => {
		return items.reduce((total, item) => {
			if (item.status === 'Sold') return total;

			// If item has variants, calculate based on variants
			if (item.variants && item.variants.length > 0) {
				const variantsProfit = item.variants.reduce(
					(vTotal, variant) => {
						const price =
							variant.marketPrice || item.marketPrice || 0;
						const cost =
							variant.purchasePrice || item.purchasePrice || 0;
						return vTotal + (price - cost) * variant.quantity;
					},
					0
				);
				return total + variantsProfit;
			}

			// Single item
			const price = item.marketPrice || 0;
			const cost = item.purchasePrice || 0;
			return total + (price - cost) * item.quantity;
		}, 0);
	}, [items]);

	const currentMonthName = new Date().toLocaleString('default', {
		month: 'long',
	});

	return (
		<div className="space-y-6 pb-12">
			<AnalyticsHeader />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="grid grid-cols-1 lg:grid-cols-3 gap-6"
			>
				{/* Main Chart */}
				<div className="lg:col-span-2">
					<RevenueChart />
				</div>

				{/* KPI Cards */}
				<div className="bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group">
					<div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
					<div className="relative z-10">
						<div className="text-lg font-medium text-emerald-200 mb-2">
							Projected Profit
						</div>
						<div className="text-4xl font-bold text-white mb-4">
							$
							{projectedProfit.toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</div>
						<div className="text-sm text-emerald-200/60">
							Potential profit from current inventory
						</div>
					</div>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="grid grid-cols-1 md:grid-cols-2 gap-6"
			>
				<ExpensesBreakdown />
				<CategoryPerformance />
			</motion.div>
		</div>
	);
}

'use client';

import { motion } from 'framer-motion';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import RevenueChart from '@/components/analytics/RevenueChart';
import ExpensesBreakdown from '@/components/analytics/ExpensesBreakdown';
import CategoryPerformance from '@/components/analytics/CategoryPerformance';

export default function AnalyticsPage() {
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

				{/* KPI Cards Placeholder or Small Widgets could go here, for now using a placeholder area or stacking the next components */}
				<div className="bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
					<div className="text-lg font-medium text-emerald-200 mb-2">
						Projected Profit
					</div>
					<div className="text-4xl font-bold text-white mb-4">
						$12,450
					</div>
					<div className="text-sm text-emerald-200/60">
						For the month of September
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

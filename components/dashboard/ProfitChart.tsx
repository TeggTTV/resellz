'use client';

import { motion } from 'framer-motion';
import { useData } from '@/context/DataContext';

export default function ProfitChart() {
	const { sales } = useData();

	// Calculate last 7 days profit
	const last7Days = Array.from({ length: 7 }, (_, i) => {
		const d = new Date();
		d.setDate(d.getDate() - (6 - i));
		return d;
	});

	const data = last7Days.map((day) => {
		const dayStr = day.toISOString().split('T')[0];
		const dailyProfit = sales
			.filter((sale) => sale.dateSold.startsWith(dayStr))
			.reduce((sum, sale) => sum + sale.netProfit, 0);
		return dailyProfit;
	});

	const maxVal = Math.max(...data, 1); // Avoid div by zero

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ delay: 0.2 }}
			className="p-6 rounded-2xl bg-white/5 border border-white/10 h-full flex flex-col"
		>
			<div className="mb-6">
				<h2 className="text-lg font-bold text-white">Profit Insight</h2>
				<p className="text-sm text-gray-400">Past 7 days performance</p>
			</div>

			<div className="flex-1 flex items-end justify-between gap-2 min-h-[200px] w-full mt-auto">
				{data.map((value, index) => {
					const height = (value / maxVal) * 100;
					const dayName = last7Days[index].toLocaleDateString(
						'en-US',
						{ weekday: 'narrow' }
					);
					return (
						<div
							key={index}
							className="relative flex flex-col items-center flex-1 group"
						>
							<motion.div
								initial={{ height: 0 }}
								animate={{ height: `${height}%` }}
								transition={{
									duration: 1,
									delay: 0.3 + index * 0.1,
									ease: 'easeOut',
								}}
								className={`w-full max-w-[40px] rounded-t-lg transition-colors relative ${
									value > 0
										? 'bg-linear-to-t from-primary/20 to-primary/60 group-hover:from-primary/40 group-hover:to-primary/80'
										: 'bg-white/5'
								}`}
							>
								{/* Tooltip */}
								<div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/10 px-2 py-1 rounded text-xs font-bold whitespace-nowrap z-10 pointer-events-none">
									${value.toLocaleString()}
								</div>
							</motion.div>
							<span className="text-xs text-gray-500 mt-2">
								{dayName}
							</span>
						</div>
					);
				})}
			</div>
		</motion.div>
	);
}

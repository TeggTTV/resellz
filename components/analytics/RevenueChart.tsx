'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/context/DataContext';

export default function RevenueChart() {
	const { sales } = useData();

	// Process sales data
	const chartData = useMemo(() => {
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		const currentYear = new Date().getFullYear();

		// Initialize all months with 0
		const monthlyData = months.map((m) => ({
			month: m,
			revenue: 0,
			profit: 0,
		}));

		sales.forEach((sale) => {
			const date = new Date(sale.dateSold);
			if (date.getFullYear() === currentYear) {
				const qty = sale.quantitySold || 1;
				const monthIndex = date.getMonth();
				monthlyData[monthIndex].revenue += sale.salePrice * qty;
				monthlyData[monthIndex].profit += sale.netProfit;
			}
		});

		// Filter to show only up to current month or months with data?
		// For now, let's show all months to keep layout stable or slice to current month
		const currentMonthIndex = new Date().getMonth();
		return monthlyData.slice(0, currentMonthIndex + 1);
	}, [sales]);

	const totalRevenue = sales.reduce(
		(acc, curr) => acc + curr.salePrice * (curr.quantitySold || 1),
		0
	);
	const maxVal = Math.max(...chartData.map((d) => d.revenue), 1000); // 1000 min to avoid div by zero

	return (
		<div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h3 className="text-lg font-bold text-white">
						Revenue vs Profit
					</h3>
					<div className="flex gap-4 mt-2">
						<div className="flex items-center gap-2 text-xs text-gray-400">
							<div className="w-2 h-2 rounded-full bg-primary" />
							Revenue
						</div>
						<div className="flex items-center gap-2 text-xs text-gray-400">
							<div className="w-2 h-2 rounded-full bg-emerald-700/50" />
							Profit
						</div>
					</div>
				</div>
				<div className="text-right">
					<div className="text-2xl font-bold text-white">
						${totalRevenue.toLocaleString()}
					</div>
					<div className="text-xs text-emerald-400">
						YTD Performance
					</div>
				</div>
			</div>

			<div className="relative h-64 flex items-end gap-2 md:gap-4">
				{/* Axis Lines */}
				<div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
					<div className="border-t border-white" />
					<div className="border-t border-white" />
					<div className="border-t border-white" />
					<div className="border-t border-white" />
				</div>

				{chartData.length === 0 ? (
					<div className="w-full flex items-center justify-center text-gray-500 text-sm">
						No sales data yet
					</div>
				) : (
					chartData.map((item, i) => {
						const revHeight = (item.revenue / maxVal) * 100;
						const profHeight =
							item.revenue > 0 ? (item.profit / maxVal) * 100 : 0;

						return (
							<div
								key={item.month}
								className="flex-1 flex flex-col justify-end h-full gap-1 group relative"
							>
								<div className="w-full flex items-end justify-center gap-1 h-full relative">
									{/* Revenue Bar */}
									<motion.div
										initial={{ height: 0 }}
										animate={{ height: `${revHeight}%` }}
										transition={{
											delay: i * 0.1,
											duration: 0.8,
										}}
										className="w-full max-w-[20px] bg-primary/20 rounded-t-sm group-hover:bg-primary/40 transition-colors"
									/>
									{/* Profit Bar */}
									<motion.div
										initial={{ height: 0 }}
										animate={{ height: `${profHeight}%` }}
										transition={{
											delay: i * 0.1 + 0.2,
											duration: 0.8,
										}}
										className="absolute bottom-0 w-full max-w-[20px] bg-primary rounded-t-sm shadow-[0_0_10px_rgba(16,185,129,0.2)]"
									/>
								</div>

								{/* Tooltip */}
								<div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/20 p-2 rounded-lg z-20 pointer-events-none min-w-[100px] text-center shadow-xl">
									<div className="text-xs text-gray-400 mb-1">
										{item.month}
									</div>
									<div className="text-xs font-bold text-white">
										Revenue: $
										{item.revenue.toLocaleString()}
									</div>
									<div className="text-[10px] text-emerald-400">
										Profit: ${item.profit.toLocaleString()}
									</div>
								</div>

								<div className="text-center text-xs text-gray-500 mt-2">
									{item.month}
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}

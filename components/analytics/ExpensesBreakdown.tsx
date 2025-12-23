'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/context/DataContext';

export default function ExpensesBreakdown() {
	const { sales } = useData();

	const expenses = useMemo(() => {
		let cogs = 0;
		let fees = 0;
		let shipping = 0;

		sales.forEach((sale) => {
			const qty = sale.quantitySold || 1;
			cogs += (sale.item.purchasePrice || 0) * qty;
			fees += (sale.platformFees || 0) * qty;
			shipping += (sale.shippingCost || 0) * qty;
		});

		const total = cogs + fees + shipping;
		// Default total to 1 to avoid division by zero if empty
		const safeTotal = total === 0 ? 1 : total;

		return {
			data: [
				{
					label: 'COGS (Inventory)',
					value: cogs,
					percent: (cogs / safeTotal) * 100,
					color: 'bg-blue-500',
				},
				{
					label: 'Platform Fees',
					value: fees,
					percent: (fees / safeTotal) * 100,
					color: 'bg-indigo-500',
				},
				{
					label: 'Shipping Labels',
					value: shipping,
					percent: (shipping / safeTotal) * 100,
					color: 'bg-violet-500',
				},
			],
			total,
		};
	}, [sales]);

	return (
		<div className="p-6 bg-white/5 border border-white/10 rounded-2xl h-full">
			<h3 className="text-lg font-bold text-white mb-6">
				Expense Breakdown
			</h3>

			<div className="space-y-6">
				{expenses.data.map((expense, i) => {
					return (
						<div key={i}>
							<div className="flex justify-between items-end mb-2">
								<span className="text-sm text-gray-400 font-medium">
									{expense.label}
								</span>
								<div className="text-right">
									<span className="text-sm font-bold text-white block">
										${expense.value.toLocaleString()}
									</span>
									<span className="text-xs text-gray-500 ml-1">
										{expense.percent.toFixed(1)}%
									</span>
								</div>
							</div>
							<div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
								<motion.div
									initial={{ width: 0 }}
									animate={{
										width: `${
											expense.value > 0
												? expense.percent
												: 0
										}%`,
									}}
									transition={{
										delay: 0.5 + i * 0.1,
										duration: 1,
									}}
									className={`h-full rounded-full ${expense.color}`}
								/>
							</div>
						</div>
					);
				})}
			</div>

			<div className="mt-8 pt-6 border-t border-white/5">
				<div className="flex justify-between items-center">
					<span className="text-gray-400">Total Expenses</span>
					<span className="text-xl font-bold text-white">
						${expenses.total.toLocaleString()}
					</span>
				</div>
			</div>
		</div>
	);
}

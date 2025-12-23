'use client';

import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { formatDistanceToNow } from 'date-fns';

export default function RecentSales() {
	const { sales } = useData();

	// Get latest 5 sales
	const recentSales = [...sales]
		.sort(
			(a, b) =>
				new Date(b.dateSold).getTime() - new Date(a.dateSold).getTime()
		)
		.slice(0, 5);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ delay: 0.3 }}
			className="p-6 rounded-2xl bg-white/5 border border-white/10 h-full flex flex-col"
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-lg font-bold text-white">Recent Sales</h2>
				<button className="text-sm text-primary hover:text-primary-hover transition-colors">
					View All
				</button>
			</div>

			<div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
				{recentSales.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full min-h-[150px] text-gray-500 text-sm">
						<Package size={32} className="mb-2 opacity-50" />
						<p>No sales yet.</p>
					</div>
				) : (
					recentSales.map((sale, index) => (
						<motion.div
							key={sale.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.1 + index * 0.1 }}
							className="flex items-center justify-between group p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
						>
							<div className="flex items-center gap-4">
								<div
									className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/50`}
								>
									<Package size={20} />
								</div>
								<div>
									<div className="font-medium text-white group-hover:text-primary transition-colors text-sm sm:text-base truncate max-w-[120px] sm:max-w-xs">
										{(sale.quantitySold || 1) > 1 && (
											<span className="text-emerald-400 font-bold mr-1">
												{sale.quantitySold}x
											</span>
										)}
										{sale.item.name ||
											sale.item.title ||
											'Unknown Item'}
									</div>
									<div className="text-xs text-gray-500">
										{formatDistanceToNow(
											new Date(sale.dateSold),
											{ addSuffix: true }
										)}
									</div>
								</div>
							</div>
							<div className="text-right">
								<div className="font-bold text-white text-sm sm:text-base">
									${sale.salePrice.toLocaleString()}
								</div>
								<div className="text-xs text-emerald-400 font-medium">
									+${sale.netProfit.toLocaleString()}
								</div>
							</div>
						</motion.div>
					))
				)}
			</div>
		</motion.div>
	);
}

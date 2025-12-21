'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useData } from '@/context/DataContext';

export default function InventoryQuickView() {
	const { items } = useData();

	// Get top 5 most expensive available items
	const topItems = items
		.filter((item) => item.status === 'Available')
		.sort((a, b) => b.marketPrice - a.marketPrice)
		.slice(0, 5);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ delay: 0.4 }}
			className="p-6 rounded-2xl bg-linear-to-br from-primary/10 to-transparent border border-primary/20 h-full"
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-lg font-bold text-white">Top Inventory</h2>
				<button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
					<ArrowUpRight size={18} />
				</button>
			</div>

			<div className="space-y-4">
				{topItems.length === 0 ? (
					<div className="text-center py-8 text-gray-500 text-sm">
						No inventory items available.
					</div>
				) : (
					topItems.map((item, index) => (
						<div
							key={item.id}
							className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5"
						>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400">
									{item.size}
								</div>
								<div>
									<div className="font-medium text-white text-sm truncate max-w-[150px]">
										{item.name || item.title}
									</div>
									<div className="text-xs text-gray-500">
										SKU: {item.sku}
									</div>
								</div>
							</div>
							<div className="text-right">
								<div className="text-sm text-white font-bold">
									{item.quantity} in stock
								</div>
								<div className="text-xs text-emerald-400">
									${item.marketPrice.toLocaleString()} Est.
								</div>
							</div>
						</div>
					))
				)}
			</div>

			<div className="mt-6 pt-4 border-t border-white/10 text-center">
				<button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors">
					Manage Inventory
				</button>
			</div>
		</motion.div>
	);
}

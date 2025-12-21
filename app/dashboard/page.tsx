'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentSales from '@/components/dashboard/RecentSales';
import ProfitChart from '@/components/dashboard/ProfitChart';
import InventoryQuickView from '@/components/dashboard/InventoryQuickView';
import AddItemModal from '@/components/inventory/AddItemModal';

export default function DashboardPage() {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	return (
		<div className="space-y-6 pb-20">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-3xl font-bold"
					>
						Welcome back, <span className="text-primary">Joey</span>
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.1 }}
						className="text-gray-400 mt-1"
					>
						Here&apos;s what&apos;s happening with your store today.
					</motion.p>
				</div>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.2 }}
					className="flex gap-3"
				>
					<button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors border border-white/10">
						Export Report
					</button>
					<button
						onClick={() => setIsAddModalOpen(true)}
						className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/20"
					>
						+ Add Item
					</button>
				</motion.div>
			</div>

			<AddItemModal
				isOpen={isAddModalOpen}
				onClose={() => setIsAddModalOpen(false)}
			/>

			{/* Stats Row */}
			<DashboardStats />

			{/* Main Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Chart Area - Spans 2 columns */}
				<div className="lg:col-span-2 min-h-[400px]">
					<ProfitChart />
				</div>

				{/* Inventory Quick View */}
				<div className="min-h-[400px]">
					<InventoryQuickView />
				</div>
			</div>

			{/* Secondary Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Sales */}
				<div className="min-h-[300px]">
					<RecentSales />
				</div>

				{/* Placeholder for future widget (e.g. Market Trends) */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.5 }}
					className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center min-h-[300px]"
				>
					<div className="text-center">
						<div className="w-16 h-16 rounded-full bg-white/5 mx-auto mb-4 flex items-center justify-center text-3xl">
							🚀
						</div>
						<h3 className="text-lg font-bold text-white mb-2">
							Pro Features
						</h3>
						<p className="text-gray-400 max-w-xs mx-auto mb-4">
							Unlock advanced market analytics and AI price
							predictions.
						</p>
						<button className="text-primary hover:text-primary-hover font-medium text-sm">
							Upgrade to Pro &rarr;
						</button>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

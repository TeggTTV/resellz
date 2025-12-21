'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Share2, Bell } from 'lucide-react';
import PriceHistoryChart from '@/components/research/PriceHistoryChart';
import ProfitCalculator from '@/components/research/ProfitCalculator';

export default function ProductDetailPage() {
	const params = useParams();
	const id = params.id as string;

	return (
		<div className="max-w-6xl mx-auto pb-12 opacity-0 animate-in fade-in duration-500 fill-mode-forwards">
			{/* Breadcrumb / Nav */}
			<div className="mb-6">
				<Link
					href="/dashboard/research"
					className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
				>
					<ArrowLeft size={16} /> Back to Search
				</Link>
			</div>

			{/* Header Section */}
			<div className="grid lg:grid-cols-3 gap-8 mb-8">
				{/* Image Column */}
				<div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-center min-h-[300px] relative overflow-hidden group">
					<div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
					{/* Mock Image */}
					<div className="text-6xl font-black text-white/10">IMG</div>
				</div>

				{/* Info Column */}
				<div className="lg:col-span-2 flex flex-col justify-center">
					<div className="flex justify-between items-start mb-4">
						<div>
							<div className="text-primary font-bold text-sm mb-2">
								SNEAKERS / JORDAN
							</div>
							<h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
								Air Jordan 1 High OG "Lost & Found"
							</h1>
							<p className="text-gray-400 font-mono">
								SKU: DZ5485-612
							</p>
						</div>
						<div className="flex gap-2">
							<button className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition">
								<Share2 size={20} />
							</button>
							<button className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition">
								<Bell size={20} />
							</button>
						</div>
					</div>

					<div className="flex flex-wrap gap-4 mb-8">
						<div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
							<div className="text-xs text-emerald-400 font-bold uppercase">
								Market Price
							</div>
							<div className="text-2xl font-bold text-white">
								$310.00
							</div>
						</div>
						<div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
							<div className="text-xs text-gray-400 font-bold uppercase">
								Retail
							</div>
							<div className="text-2xl font-bold text-white">
								$180.00
							</div>
						</div>
						<div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
							<div className="text-xs text-gray-400 font-bold uppercase">
								Volatility
							</div>
							<div className="text-2xl font-bold text-amber-400">
								High
							</div>
						</div>
					</div>

					<div className="flex gap-3">
						<button className="flex-1 bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
							View on StockX <ExternalLink size={16} />
						</button>
						<button className="flex-1 bg-black border border-white/20 text-white font-bold py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
							View on GOAT <ExternalLink size={16} />
						</button>
					</div>
				</div>
			</div>

			{/* Main Content Grid */}
			<div className="grid lg:grid-cols-3 gap-8">
				{/* Chart Column (2/3) */}
				<div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[400px]">
					<PriceHistoryChart />
				</div>

				{/* Sidebar Column (1/3) */}
				<div className="space-y-6">
					<ProfitCalculator />

					{/* Recent Sales Mini-List */}
					<div className="bg-white/5 border border-white/10 rounded-2xl p-6">
						<h3 className="font-bold text-white mb-4">
							Latest Sales
						</h3>
						<div className="space-y-3">
							{[1, 2, 3, 4, 5].map((i) => (
								<div
									key={i}
									className="flex justify-between text-sm py-2 border-b border-white/5 last:border-0"
								>
									<div className="text-gray-400">
										Oct {20 - i}, 2:30 PM
									</div>
									<div className="font-mono font-bold text-white">
										$3{10 + i * 2}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

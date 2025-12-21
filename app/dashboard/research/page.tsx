import ResearchHeader from '@/components/research/ResearchHeader';
import TrendingGrid from '@/components/research/TrendingGrid';
import Link from 'next/link';

export default function ResearchPage() {
	return (
		<div className="max-w-6xl mx-auto space-y-12 pb-12">
			<ResearchHeader />

			<div className="space-y-12">
				<TrendingGrid />

				{/* Market Movers Section (Secondary Grid) */}
				<div className="grid md:grid-cols-2 gap-8">
					<div className="bg-white/5 border border-white/10 rounded-2xl p-6">
						<h3 className="text-lg font-bold text-white mb-4">
							Top Gainers 🚀
						</h3>
						<div className="space-y-4">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="flex items-center justify-between p-3 bg-black/20 rounded-xl"
								>
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">
											{i}
										</div>
										<div>
											<div className="font-bold text-white text-sm">
												Jordan 4 Retro SB
											</div>
											<div className="text-xs text-gray-500">
												Sneakers
											</div>
										</div>
									</div>
									<div className="text-right">
										<div className="text-emerald-400 font-bold">
											+24%
										</div>
										<div className="text-xs text-gray-400">
											$450
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="bg-white/5 border border-white/10 rounded-2xl p-6">
						<h3 className="text-lg font-bold text-white mb-4">
							Price Drops 📉
						</h3>
						<div className="space-y-4">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="flex items-center justify-between p-3 bg-black/20 rounded-xl"
								>
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded bg-red-500/20 flex items-center justify-center text-red-500 font-bold">
											{i}
										</div>
										<div>
											<div className="font-bold text-white text-sm">
												Rolex Submariner
											</div>
											<div className="text-xs text-gray-500">
												Watches
											</div>
										</div>
									</div>
									<div className="text-right">
										<div className="text-red-400 font-bold">
											-12%
										</div>
										<div className="text-xs text-gray-400">
											$12,450
										</div>
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

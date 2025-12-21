'use client';

import { useState } from 'react';
import { DollarSign, Percent, Calculator } from 'lucide-react';

export default function ProfitCalculator({
	marketPrice = 310,
}: {
	marketPrice?: number;
}) {
	const [buyPrice, setBuyPrice] = useState<string>('');
	const [fees, setFees] = useState<string>('13'); // Percentage

	const buy = parseFloat(buyPrice) || 0;
	const feePercent = parseFloat(fees) || 0;
	const totalFees = marketPrice * (feePercent / 100);
	const profit = marketPrice - buy - totalFees;
	const margin = marketPrice > 0 ? (profit / marketPrice) * 100 : 0;

	return (
		<div className="bg-white/5 border border-white/10 rounded-2xl p-6">
			<div className="flex items-center gap-2 mb-6 text-white font-bold text-lg">
				<Calculator className="text-primary" size={20} />
				<h3>Profit Calculator</h3>
			</div>

			<div className="space-y-4">
				{/* Buy Price Input */}
				<div>
					<label className="block text-xs text-gray-400 mb-1.5 uppercase font-medium">
						Your Buy Price
					</label>
					<div className="relative">
						<DollarSign
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
							size={16}
						/>
						<input
							type="number"
							value={buyPrice}
							onChange={(e) => setBuyPrice(e.target.value)}
							placeholder="0.00"
							className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
						/>
					</div>
				</div>

				{/* Platform Fees Input */}
				<div>
					<label className="block text-xs text-gray-400 mb-1.5 uppercase font-medium">
						Platform Fees (%)
					</label>
					<div className="relative">
						<Percent
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
							size={16}
						/>
						<input
							type="number"
							value={fees}
							onChange={(e) => setFees(e.target.value)}
							className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-9 pr-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
						/>
					</div>
				</div>

				<div className="h-px bg-white/10 my-4" />

				{/* Results */}
				<div className="space-y-3">
					<div className="flex justify-between text-sm">
						<span className="text-gray-400">Sale Price</span>
						<span className="text-white font-medium">
							${marketPrice.toFixed(2)}
						</span>
					</div>
					<div className="flex justify-between text-sm">
						<span className="text-gray-400">Total Fees</span>
						<span className="text-red-400 font-medium">
							-${totalFees.toFixed(2)}
						</span>
					</div>
					<div className="p-4 bg-black/20 rounded-xl border border-white/5 mt-2">
						<div className="flex justify-between items-end mb-1">
							<span className="text-gray-400 text-sm">
								Net Profit
							</span>
							<span
								className={`text-2xl font-bold ${
									profit > 0
										? 'text-emerald-400'
										: profit < 0
										? 'text-red-400'
										: 'text-gray-400'
								}`}
							>
								${profit.toFixed(2)}
							</span>
						</div>
						<div className="flex justify-end">
							<span
								className={`text-xs font-bold px-2 py-0.5 rounded-full ${
									margin > 20
										? 'bg-emerald-500/20 text-emerald-400'
										: margin > 0
										? 'bg-amber-500/20 text-amber-400'
										: 'bg-red-500/20 text-red-400'
								}`}
							>
								{margin.toFixed(1)}% ROI
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

'use client';

import { motion } from 'framer-motion';

// Mock data points
const historyData = [
	180, 195, 190, 210, 205, 225, 240, 235, 250, 280, 275, 310,
];
const maxVal = Math.max(...historyData);
const minVal = Math.min(...historyData);

export default function PriceHistoryChart() {
	return (
		<div className="w-full h-full flex flex-col">
			<div className="flex justify-between items-center mb-6">
				<h3 className="font-bold text-white">Price History</h3>
				<div className="flex bg-white/5 rounded-lg p-1">
					{['1M', '3M', '6M', '1Y', 'ALL'].map((range, i) => (
						<button
							key={range}
							className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
								i === 1
									? 'bg-primary text-white shadow-lg'
									: 'text-gray-400 hover:text-white'
							}`}
						>
							{range}
						</button>
					))}
				</div>
			</div>

			<div className="flex-1 relative border-l border-b border-white/10 min-h-[300px] flex items-end px-4 pb-4 gap-2 lg:gap-4">
				{/* Background Grid Lines (Simplified) */}
				<div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-4 pr-4 opacity-10">
					<div className="w-full h-px bg-white" />
					<div className="w-full h-px bg-white" />
					<div className="w-full h-px bg-white" />
					<div className="w-full h-px bg-white" />
				</div>

				{/* Bars representing line chart points for visual flair */}
				{historyData.map((val, i) => {
					const height =
						((val - minVal) / (maxVal - minVal)) * 80 + 10;
					return (
						<div
							key={i}
							className="flex-1 flex flex-col justify-end h-full group relative"
						>
							<motion.div
								initial={{ height: 0 }}
								animate={{ height: `${height}%` }}
								transition={{
									duration: 0.8,
									delay: i * 0.05,
									ease: 'backOut',
								}}
								className="w-full bg-linear-to-t from-primary/10 to-primary rounded-t-sm group-hover:from-primary/30 group-hover:to-emerald-300 transition-colors relative"
							>
								{/* Tooltip */}
								<div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/20 px-2 py-1 rounded text-xs font-bold whitespace-nowrap z-20 pointer-events-none">
									${val}
								</div>
								{/* Connector dot */}
								<div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_10px_white]" />
							</motion.div>
						</div>
					);
				})}
			</div>

			<div className="flex justify-between mt-2 text-xs text-gray-500 font-mono">
				<span>Jan</span>
				<span>Feb</span>
				<span>Mar</span>
				<span>Apr</span>
				<span>May</span>
				<span>Jun</span>
			</div>
		</div>
	);
}

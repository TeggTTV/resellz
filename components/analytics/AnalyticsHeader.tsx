'use client';

import { Calendar } from 'lucide-react';

export default function AnalyticsHeader() {
	return (
		<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
			<div>
				<h1 className="text-3xl font-bold text-white mb-2">
					Analytics
				</h1>
				<p className="text-gray-400">
					Track your business growth and performance.
				</p>
			</div>

			<div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
				<button className="px-4 py-2 text-sm font-medium rounded-lg bg-black/40 text-white shadow-xs">
					Last 30 Days
				</button>
				<button className="px-4 py-2 text-sm font-medium rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
					Last Year
				</button>
				<div className="w-px h-6 bg-white/10 mx-1" />
				<button className="px-3 py-2 text-gray-400 hover:text-white transition-colors">
					<Calendar size={18} />
				</button>
			</div>
		</div>
	);
}

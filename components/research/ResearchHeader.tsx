'use client';

import { Search, Command } from 'lucide-react';

export default function ResearchHeader() {
	return (
		<div className="relative mb-12">
			{/* Background Decoration */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-32 bg-primary/20 blur-[100px] -z-10 rounded-full" />

			<div className="text-center mb-8">
				<h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-white/60 mb-4">
					Find Your Next <span className="text-primary">Winner</span>
				</h1>
				<p className="text-gray-400 max-w-2xl mx-auto text-lg">
					Search millions of sales records to find the most profitable
					items to flip.
				</p>
			</div>

			<div className="max-w-3xl mx-auto relative group">
				<div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 rounded-2xl" />
				<div className="relative flex items-center bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
					<Search className="ml-4 text-gray-400" size={24} />
					<input
						type="text"
						placeholder="Search for sneakers, electronics, or collectibles..."
						className="w-full bg-transparent border-none focus:outline-hidden text-lg px-4 py-3 text-white placeholder:text-gray-500"
					/>
					<div className="hidden md:flex items-center gap-2 pr-4 text-xs text-gray-500 font-mono border-l border-white/10 pl-4">
						<Command size={14} /> K
					</div>
					<button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
						Search
					</button>
				</div>
			</div>
		</div>
	);
}

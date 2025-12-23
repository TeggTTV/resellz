'use client';

import { Search, Filter, LayoutGrid, List } from 'lucide-react';

interface InventoryFiltersProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	viewMode: 'grid' | 'list';
	setViewMode: (mode: 'grid' | 'list') => void;
	activeFilter: string;
	setFilter: (filter: string) => void;
}

export default function InventoryFilters({
	searchQuery,
	setSearchQuery,
	viewMode,
	setViewMode,
	activeFilter,
	setFilter,
}: InventoryFiltersProps) {
	return (
		<div className="flex flex-col md:flex-row gap-4 mb-6">
			{/* Search */}
			<div className="relative flex-1">
				<Search
					className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
					size={20}
				/>
				<input
					type="text"
					placeholder="Search by name, SKU, or brand..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-hidden focus:border-primary/50 transition-colors"
				/>
			</div>

			{/* Filters & View Toggle */}
			<div className="flex gap-2">
				{/* Filter Chips */}
				<div className="flex bg-white/5 p-1 rounded-xl border border-white/10 h-full">
					{['All', 'Available', 'Sold'].map((filter) => (
						<button
							key={filter}
							onClick={() => setFilter(filter)}
							className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
								activeFilter === filter
									? 'bg-primary text-white shadow-xs'
									: 'text-gray-400 hover:text-white'
							}`}
						>
							{filter}
						</button>
					))}
				</div>

				<div className="h-full w-px bg-white/10 mx-1" />

				{/* View Toggle */}
				<button
					onClick={() => setViewMode('grid')}
					className={`p-2.5 border rounded-xl transition ${
						viewMode === 'grid'
							? 'bg-primary/20 text-primary border-primary/20'
							: 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
					}`}
				>
					<LayoutGrid size={20} />
				</button>
				<button
					onClick={() => setViewMode('list')}
					className={`p-2.5 border rounded-xl transition ${
						viewMode === 'list'
							? 'bg-primary/20 text-primary border-primary/20'
							: 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
					}`}
				>
					<List size={20} />
				</button>
			</div>
		</div>
	);
}

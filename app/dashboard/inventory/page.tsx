'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Share2 } from 'lucide-react';
import InventoryStats from '@/components/inventory/InventoryStats';
import InventoryFilters from '@/components/inventory/InventoryFilters';
import InventoryCard from '@/components/inventory/InventoryCard';
import AddItemModal from '@/components/inventory/AddItemModal';
import SellItemModal from '@/components/inventory/SellItemModal';
import ShareInventoryModal from '@/components/inventory/ShareInventoryModal';
import { useData } from '@/context/DataContext';
import { InventoryItem } from '@/types/data';

export default function InventoryPage() {
	const { items, deleteItem } = useData();
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
	const [sellingItem, setSellingItem] = useState<InventoryItem | null>(null);
	const [isDuplicateMode, setIsDuplicateMode] = useState(false);

	// Filter State
	const [searchQuery, setSearchQuery] = useState('');
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
	const [activeFilter, setFilter] = useState('All');

	// Derived State
	const filteredItems = items.filter((item) => {
		const matchesSearch =
			(item.name || '')
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.brand.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesFilter =
			activeFilter === 'All' ? true : item.status === activeFilter;

		return matchesSearch && matchesFilter;
	});

	const handleEdit = (item: InventoryItem) => {
		setEditingItem(item);
		setIsDuplicateMode(false);
		setIsAddModalOpen(true);
	};

	const handleDuplicate = (item: InventoryItem) => {
		setEditingItem(item);
		setIsDuplicateMode(true);
		setIsAddModalOpen(true);
	};

	const handleCloseAddModal = () => {
		setIsAddModalOpen(false);
		setEditingItem(null);
		setIsDuplicateMode(false);
	};

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<motion.h1
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className="text-3xl font-bold"
					>
						Inventory
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.1 }}
						className="text-gray-400"
					>
						Manage your stock, track profits, and organize listings.
					</motion.p>
				</div>
				<div className="flex items-center gap-3">
					<motion.button
						onClick={() => setIsShareModalOpen(true)}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						whileHover={{ scale: 1 }}
						whileTap={{ scale: 0.95 }}
						className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold border border-white/10 transition-all"
					>
						<Share2 size={20} />
						<span>Share</span>
					</motion.button>
					<motion.button
						onClick={() => setIsAddModalOpen(true)}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						whileHover={{ scale: 1 }}
						whileTap={{ scale: 0.95 }}
						className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all"
					>
						<Plus size={20} />
						<span>Add New Item</span>
					</motion.button>
				</div>
			</div>

			<AddItemModal
				isOpen={isAddModalOpen}
				onClose={handleCloseAddModal}
				itemToEdit={editingItem}
				isDuplicate={isDuplicateMode}
			/>

			<ShareInventoryModal
				isOpen={isShareModalOpen}
				onClose={() => setIsShareModalOpen(false)}
			/>

			<SellItemModal
				isOpen={!!sellingItem}
				onClose={() => setSellingItem(null)}
				item={sellingItem}
			/>

			<InventoryStats />

			<InventoryFilters
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				viewMode={viewMode}
				setViewMode={setViewMode}
				activeFilter={activeFilter}
				setFilter={setFilter}
			/>

			{/* Inventory Grid/List */}
			{filteredItems.length === 0 ? (
				<div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
					<p className="text-gray-400">
						No items found matching your criteria.
					</p>
				</div>
			) : (
				<div
					className={
						viewMode === 'grid'
							? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
							: 'flex flex-col gap-4' // List View Styles
					}
				>
					{filteredItems.map((item, index) => (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 + index * 0.05 }}
							className={viewMode === 'list' ? 'w-full' : ''}
						>
							<InventoryCard
								item={item}
								onEdit={handleEdit}
								onSell={setSellingItem}
								onDelete={deleteItem}
								onDuplicate={handleDuplicate}
								viewMode={viewMode}
							/>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
}

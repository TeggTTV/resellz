'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, DollarSign, Tag, Package, Save } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { InventoryItem } from '@/types/data';

interface AddItemModalProps {
	isOpen: boolean;
	onClose: () => void;
	itemToEdit?: InventoryItem | null; // Optional item for editing mode
}

export default function AddItemModal({
	isOpen,
	onClose,
	itemToEdit,
}: AddItemModalProps) {
	const { addItem, updateItem } = useData();
	const [formData, setFormData] = useState({
		name: '',
		brand: '',
		sku: '',
		size: '',
		purchasePrice: '',
		marketPrice: '',
		notes: '',
	});

	// Populate form when opening in edit mode
	useEffect(() => {
		if (isOpen) {
			if (itemToEdit) {
				setFormData({
					name: itemToEdit.name || itemToEdit.title || '', // Handle legacy title/name
					brand: itemToEdit.brand,
					sku: itemToEdit.sku,
					size: itemToEdit.size,
					purchasePrice: itemToEdit.purchasePrice.toString(),
					marketPrice: itemToEdit.marketPrice.toString(),
					notes: itemToEdit.notes || '',
				});
			} else {
				// Reset for add mode
				setFormData({
					name: '',
					brand: '',
					sku: '',
					size: '',
					purchasePrice: '',
					marketPrice: '',
					notes: '',
				});
			}
		}
	}, [isOpen, itemToEdit]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const quantity = Number(formData.quantity) || 1;

		const itemData: any = {
			name: formData.name,
			title: formData.name,
			brand: formData.brand,
			sku: formData.sku,
			size: formData.size,
			quantity: quantity,
			purchasePrice: Number(formData.purchasePrice),
			marketPrice: Number(formData.marketPrice),
			notes: formData.notes,
			image: itemToEdit?.image || '',
			imageUrl: itemToEdit?.imageUrl || '',
		};

		if (itemToEdit) {
			// If restocking (adding quantity), ensure status is Available
			if (quantity > 0) {
				itemData.status = 'Available';
			}
			updateItem(itemToEdit.id, itemData);
		} else {
			// New items always start with 0 sold
			itemData.soldQuantity = 0;
			addItem(itemData);
		}

		onClose();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
					/>

					{/* Modal */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl z-50 p-6 md:p-8"
					>
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-white">
								{itemToEdit ? 'Edit Item' : 'Add New Item'}
							</h2>
							<button
								onClick={onClose}
								className="text-gray-400 hover:text-white transition-colors"
							>
								<X size={24} />
							</button>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
									Product Name
								</label>
								<div className="relative">
									<Package
										className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
										size={18}
									/>
									<input
										required
										type="text"
										placeholder="e.g. Air Jordan 1 Lost & Found"
										value={formData.name}
										onChange={(e) =>
											setFormData({
												...formData,
												name: e.target.value,
											})
										}
										className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
										Brand
									</label>
									<div className="relative">
										<Tag
											className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
											size={18}
										/>
										<input
											required
											type="text"
											placeholder="Nike"
											value={formData.brand}
											onChange={(e) =>
												setFormData({
													...formData,
													brand: e.target.value,
												})
											}
											className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
										/>
									</div>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
										SKU / Style Code
									</label>
									<input
										type="text"
										placeholder="DZ5485-612"
										value={formData.sku}
										onChange={(e) =>
											setFormData({
												...formData,
												sku: e.target.value,
											})
										}
										className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
										Size
									</label>
									<input
										required
										type="text"
										placeholder="US 10.5"
										value={formData.size}
										onChange={(e) =>
											setFormData({
												...formData,
												size: e.target.value,
											})
										}
										className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
										Quantity
									</label>
									<input
										required
										type="number"
										min="1"
										placeholder="1"
										value={formData.quantity}
										onChange={(e) =>
											setFormData({
												...formData,
												quantity: e.target.value,
											})
										}
										className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
										Purchase Price
									</label>
									<div className="relative">
										<DollarSign
											className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
											size={18}
										/>
										<input
											required
											type="number"
											placeholder="0.00"
											value={formData.purchasePrice}
											onChange={(e) =>
												setFormData({
													...formData,
													purchasePrice:
														e.target.value,
												})
											}
											className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
										/>
									</div>
								</div>
								<div>
									<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
										Market Price
									</label>
									<div className="relative">
										<DollarSign
											className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
											size={18}
										/>
										<input
											required
											type="number"
											placeholder="0.00"
											value={formData.marketPrice}
											onChange={(e) =>
												setFormData({
													...formData,
													marketPrice: e.target.value,
												})
											}
											className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
										/>
									</div>
								</div>
							</div>

							<div className="pt-4">
								<button
									type="submit"
									className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
								>
									{itemToEdit ? (
										<>
											<Save size={20} />
											Save Changes
										</>
									) : (
										<>
											<Plus size={20} />
											Add to Inventory
										</>
									)}
								</button>
							</div>
						</form>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

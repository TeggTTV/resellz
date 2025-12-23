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
		quantity: '1',
	});
	const [image, setImage] = useState<string>('');

	// New: Variants State with optional price override
	const [variants, setVariants] = useState<
		{
			size: string;
			quantity: number;
			marketPrice?: number;
			purchasePrice?: number;
		}[]
	>([]);
	const [useVariants, setUseVariants] = useState(false);

	// Populate form when opening in edit mode
	useEffect(() => {
		if (isOpen) {
			if (itemToEdit) {
				setFormData({
					name: itemToEdit.name || (itemToEdit as any).title || '', // Handle legacy title/name
					brand: itemToEdit.brand,
					sku: itemToEdit.sku,
					size: itemToEdit.size,
					purchasePrice: itemToEdit.purchasePrice.toString(),
					marketPrice: itemToEdit.marketPrice.toString(),
					notes: itemToEdit.notes || '',
					quantity: itemToEdit.quantity.toString(),
				});
				setImage(itemToEdit.imageUrl || '');

				// Initialize variants if existing
				if (itemToEdit.variants && itemToEdit.variants.length > 0) {
					setVariants(itemToEdit.variants);
					setUseVariants(true);
				} else {
					setVariants([]);
					setUseVariants(false);
				}
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
					quantity: '1',
				});
				setImage('');
				setVariants([]);
				setUseVariants(false);
			}
		}
	}, [isOpen, itemToEdit]);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const removeImage = () => {
		setImage('');
	};

	const handleAddVariant = () => {
		if (!useVariants) {
			setVariants([
				{
					size: formData.size,
					quantity: Number(formData.quantity) || 1,
					marketPrice: formData.marketPrice
						? Number(formData.marketPrice)
						: undefined,
					purchasePrice: formData.purchasePrice
						? Number(formData.purchasePrice)
						: undefined,
				},
				{
					size: '',
					quantity: 1,
					marketPrice: formData.marketPrice
						? Number(formData.marketPrice)
						: undefined,
					purchasePrice: formData.purchasePrice
						? Number(formData.purchasePrice)
						: undefined,
				},
			]);
		} else {
			setVariants([
				...variants,
				{
					size: '',
					quantity: 1,
					marketPrice: formData.marketPrice
						? Number(formData.marketPrice)
						: undefined,
					purchasePrice: formData.purchasePrice
						? Number(formData.purchasePrice)
						: undefined,
				},
			]);
		}
		setUseVariants(true);
	};

	const handleRemoveVariant = (index: number) => {
		const newVariants = variants.filter((_, i) => i !== index);
		setVariants(newVariants);

		if (newVariants.length === 0) {
			setUseVariants(false);
		} else if (newVariants.length === 1) {
			// Revert to single item mode with the remaining variant's data
			const surviving = newVariants[0];
			setFormData((prev) => ({
				...prev,
				size: surviving.size,
				quantity: surviving.quantity.toString(),
				marketPrice: surviving.marketPrice
					? surviving.marketPrice.toString()
					: '',
				purchasePrice: surviving.purchasePrice
					? surviving.purchasePrice.toString()
					: '',
			}));
			setUseVariants(false);
		}
	};

	const updateVariant = (
		index: number,
		field: 'size' | 'quantity' | 'marketPrice' | 'purchasePrice',
		value: string | number
	) => {
		const newVariants = [...variants];
		if (field === 'quantity') {
			newVariants[index].quantity = Number(value);
		} else if (field === 'marketPrice') {
			newVariants[index].marketPrice =
				value === '' ? undefined : Number(value);
		} else if (field === 'purchasePrice') {
			newVariants[index].purchasePrice =
				value === '' ? undefined : Number(value);
		} else {
			newVariants[index].size = String(value);
		}
		setVariants(newVariants);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		let finalQuantity = Number(formData.quantity) || 1;
		let finalSize = formData.size;
		let finalVariants:
			| { size: string; quantity: number; marketPrice?: number }[]
			| undefined = undefined;

		// If using variants, aggregate data
		if (useVariants && variants.length > 0) {
			finalQuantity = variants.reduce(
				(acc, v) => acc + (Number(v.quantity) || 0),
				0
			);
			finalVariants = variants.map((v) => ({
				size: v.size,
				quantity: Number(v.quantity) || 1,
				marketPrice: v.marketPrice,
				purchasePrice: v.purchasePrice,
			}));

			// If mixed sizes, label as Multiple, otherwise if single variant use that size
			if (finalVariants.length > 1) {
				const uniqueSizes = new Set(finalVariants.map((v) => v.size));
				finalSize =
					uniqueSizes.size > 1 ? 'Multiple' : finalVariants[0].size;
			} else if (finalVariants.length === 1) {
				finalSize = finalVariants[0].size;
			}
		}

		const itemData: any = {
			name: formData.name,
			title: formData.name,
			brand: formData.brand,
			sku: formData.sku,
			size: finalSize,
			quantity: finalQuantity,
			purchasePrice: Number(formData.purchasePrice),
			marketPrice: Number(formData.marketPrice),
			notes: formData.notes,
			image: image,
			imageUrl: image,
			variants: finalVariants,
		};

		if (itemToEdit) {
			// If restocking (adding quantity), ensure status is Available
			if (finalQuantity > 0) {
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
						className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl z-50 p-6 md:p-8 max-h-[90vh] overflow-y-auto"
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
							{/* Image Upload Section */}
							<div className="w-full">
								<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
									Item Image
								</label>
								<div className="flex items-center gap-4">
									<div
										className={`relative w-24 h-24 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden bg-white/5 group ${
											!image
												? 'hover:border-primary/50 cursor-pointer transition-colors'
												: ''
										}`}
									>
										{image ? (
											<>
												<img
													src={image}
													alt="Preview"
													className="w-full h-full object-cover"
												/>
												<button
													type="button"
													onClick={removeImage}
													className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
												>
													<X
														size={24}
														className="text-white"
													/>
												</button>
											</>
										) : (
											<label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
												<Plus
													size={24}
													className="text-gray-500 mb-1"
												/>
												<span className="text-[10px] text-gray-500 font-medium">
													Upload
												</span>
												<input
													type="file"
													accept="image/*"
													className="hidden"
													onChange={handleImageUpload}
												/>
											</label>
										)}
									</div>
									<div className="flex-1">
										<p className="text-xs text-gray-500">
											Add a photo to verify your item and
											make it stand out in your inventory.
										</p>
									</div>
								</div>
							</div>
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

							{/* Size and Quantity Section */}
							{!useVariants ? (
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
											Size
										</label>
										<input
											required={!useVariants}
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
											required={!useVariants}
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
							) : (
								<div className="space-y-4">
									<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
										Sizes & Quantities
									</label>
									{variants.map((variant, index) => (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											key={index}
											className="p-4 bg-white/5 rounded-xl border border-white/10 relative group"
										>
											<button
												type="button"
												onClick={() =>
													handleRemoveVariant(index)
												}
												className="absolute right-2 top-2 p-2 text-red-400/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
											>
												<X size={16} />
											</button>

											<div className="grid grid-cols-2 gap-4 mb-4">
												<div>
													<label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5">
														Size
													</label>
													<input
														required
														type="text"
														placeholder="e.g. US 10"
														value={variant.size}
														onChange={(e) =>
															updateVariant(
																index,
																'size',
																e.target.value
															)
														}
														className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 px-3 text-white focus:outline-hidden focus:border-primary/50 transition-colors text-sm"
													/>
												</div>
												<div className="pr-8">
													<label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5">
														Quantity
													</label>
													<input
														required
														type="number"
														min="1"
														placeholder="1"
														value={variant.quantity}
														onChange={(e) =>
															updateVariant(
																index,
																'quantity',
																e.target.value
															)
														}
														className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 px-3 text-white focus:outline-hidden focus:border-primary/50 transition-colors text-sm"
													/>
												</div>
											</div>

											<div className="grid grid-cols-2 gap-4">
												<div>
													<label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5">
														Purchase Price ($)
													</label>
													<div className="relative">
														<DollarSign
															className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600"
															size={14}
														/>
														<input
															type="number"
															placeholder="0.00"
															value={
																variant.purchasePrice ||
																''
															}
															onChange={(e) =>
																updateVariant(
																	index,
																	'purchasePrice',
																	e.target
																		.value
																)
															}
															className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-8 pr-3 text-white focus:outline-hidden focus:border-primary/50 transition-colors text-sm"
														/>
													</div>
												</div>
												<div>
													<label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5">
														Market Price ($)
													</label>
													<div className="relative">
														<DollarSign
															className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600"
															size={14}
														/>
														<input
															type="number"
															placeholder="0.00"
															value={
																variant.marketPrice ||
																''
															}
															onChange={(e) =>
																updateVariant(
																	index,
																	'marketPrice',
																	e.target
																		.value
																)
															}
															className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-8 pr-3 text-white focus:outline-hidden focus:border-primary/50 transition-colors text-sm"
														/>
													</div>
												</div>
											</div>
										</motion.div>
									))}
								</div>
							)}

							{/* Add Size Toggle Button */}
							<div className="flex justify-start">
								<button
									type="button"
									onClick={handleAddVariant}
									className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 transition-colors"
								>
									<Plus size={14} />
									Add Size Variant
								</button>
							</div>

							<div className="grid grid-cols-2 gap-4">
								{!useVariants && (
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
								)}
								{!useVariants && (
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
														marketPrice:
															e.target.value,
													})
												}
												className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
											/>
										</div>
									</div>
								)}
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

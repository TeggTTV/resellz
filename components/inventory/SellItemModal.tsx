'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Tag, Truck } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { InventoryItem } from '@/types/data';

interface SellItemModalProps {
	isOpen: boolean;
	onClose: () => void;
	item: InventoryItem | null;
}

export default function SellItemModal({
	isOpen,
	onClose,
	item,
}: SellItemModalProps) {
	const { sellItem } = useData();
	const [salePrice, setSalePrice] = useState('');
	const [platformFees, setPlatformFees] = useState('');
	const [shippingCost, setShippingCost] = useState('');
	const [totalStock, setTotalStock] = useState('1');
	const [soldStock, setSoldStock] = useState('0');

	// Reset form when opening for a new item
	useEffect(() => {
		if (isOpen && item) {
			setSalePrice((item.marketPrice || '').toString());
			setPlatformFees('0');
			setShippingCost('0');
			setTotalStock(
				((item.quantity || 0) + (item.soldQuantity || 0)).toString()
			);
			setSoldStock((item.soldQuantity || 0).toString());
		}
	}, [isOpen, item]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!item) return;

		const total = Number(totalStock) || 1;
		let sold = Number(soldStock) || 0;
		if (sold > total) sold = total;

		const newQuantity = total - sold;
		const newStatus = newQuantity > 0 ? 'Available' : 'Sold';

		sellItem(
			item.id,
			{
				salePrice: Number(salePrice),
				platformFees: Number(platformFees),
				shippingCost: Number(shippingCost),
			},
			{
				quantity: newQuantity,
				soldQuantity: sold,
				status: newStatus,
			}
		);
		onClose();
	};

	const estimatedProfit = item
		? Number(salePrice) -
		  Number(platformFees) -
		  Number(shippingCost) -
		  item.purchasePrice
		: 0;

	return (
		<AnimatePresence>
			{isOpen && item && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="absolute inset-0 bg-black/60 backdrop-blur-sm"
					/>

					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						className="relative w-full max-w-md bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
					>
						{/* Header */}
						<div className="p-6 border-b border-white/5 flex justify-between items-center">
							<h2 className="text-xl font-bold text-white">
								Mark as Sold
							</h2>
							<button
								onClick={onClose}
								className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
							>
								<X size={20} />
							</button>
						</div>

						{/* Item Summary */}
						<div className="px-6 py-4 bg-white/5 border-b border-white/5">
							<p className="text-sm text-gray-400 mb-1">
								Selling Item:
							</p>
							<p className="text-white font-medium truncate">
								{item.name}
							</p>
							<p className="text-xs text-gray-500 mt-1">
								Bought for:{' '}
								<span className="text-white">
									${item.purchasePrice}
								</span>
							</p>
						</div>

						{/* Form */}
						<form onSubmit={handleSubmit} className="p-6 space-y-4">
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-400 mb-1.5">
										Stock Status (Sold / Total)
									</label>
									<div className="flex items-center gap-2">
										<div className="relative flex-1">
											<input
												required
												type="number"
												min="0"
												value={soldStock}
												onChange={(e) =>
													setSoldStock(e.target.value)
												}
												className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-hidden focus:border-blue-500/50 transition-colors text-center font-bold"
												placeholder="0"
											/>
											<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none uppercase">
												Sold
											</span>
										</div>
										<span className="text-gray-500 font-bold">
											/
										</span>
										<div className="relative flex-1">
											<input
												required
												type="number"
												min="1"
												value={totalStock}
												onChange={(e) =>
													setTotalStock(
														e.target.value
													)
												}
												className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors text-center font-bold"
												placeholder="1"
											/>
											<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none uppercase">
												Total
											</span>
										</div>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-400 mb-1.5">
										Sale Price ($)
									</label>
									<div className="relative">
										<DollarSign
											className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
											size={16}
										/>
										<input
											type="number"
											required
											value={salePrice}
											onChange={(e) =>
												setSalePrice(e.target.value)
											}
											className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
											placeholder="0.00"
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-400 mb-1.5">
											Platform Fees
										</label>
										<div className="relative">
											<Tag
												className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
												size={16}
											/>
											<input
												type="number"
												value={platformFees}
												onChange={(e) =>
													setPlatformFees(
														e.target.value
													)
												}
												className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
												placeholder="0.00"
											/>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-400 mb-1.5">
											Shipping Cost
										</label>
										<div className="relative">
											<Truck
												className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
												size={16}
											/>
											<input
												type="number"
												value={shippingCost}
												onChange={(e) =>
													setShippingCost(
														e.target.value
													)
												}
												className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
												placeholder="0.00"
											/>
										</div>
									</div>
								</div>

								{/* Profit Preview */}
								<div className="p-4 bg-white/5 rounded-xl border border-white/10">
									<div className="flex justify-between items-center text-sm">
										<span className="text-gray-400">
											Estimated Net Profit
										</span>
										<span
											className={`font-bold text-lg ${
												estimatedProfit >= 0
													? 'text-emerald-400'
													: 'text-red-400'
											}`}
										>
											${estimatedProfit.toFixed(2)}
										</span>
									</div>
								</div>
							</div>

							<button
								type="submit"
								className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
							>
								Confirm Sale
							</button>
						</form>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}

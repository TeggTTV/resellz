'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Copy, Check, ShoppingBag, Hash } from 'lucide-react';
import { useData } from '@/context/DataContext';
import * as htmlToImage from 'html-to-image';
import { InventoryItem } from '@/types/data';

interface ShareInventoryModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ShareInventoryModal({
	isOpen,
	onClose,
}: ShareInventoryModalProps) {
	const { items } = useData();
	const [isGenerating, setIsGenerating] = useState(false);
	const [statusMsg, setStatusMsg] = useState('');
	const cardRef = useRef<HTMLDivElement>(null);

	// Filter for available items only
	const availableItems = items.filter((item) => item.status === 'Available');

	const handleDownload = async () => {
		if (!cardRef.current || isGenerating) return;

		setIsGenerating(true);
		setStatusMsg('Generating image...');

		try {
			// Small delay to ensure rendering
			await new Promise((resolve) => setTimeout(resolve, 500));

			const dataUrl = await htmlToImage.toPng(cardRef.current, {
				quality: 0.95,
				pixelRatio: 2,
				backgroundColor: '#000000',
			});

			const link = document.createElement('a');
			link.download = `my-shop-inventory-${
				new Date().toISOString().split('T')[0]
			}.png`;
			link.href = dataUrl;
			link.click();

			setStatusMsg('Downloaded!');
			setTimeout(() => {
				setStatusMsg('');
				onClose();
			}, 1500);
		} catch (error) {
			console.error('Failed to generate image', error);
			setStatusMsg('Error generating image');
		} finally {
			setIsGenerating(false);
		}
	};

	const getTotalValue = () => {
		return availableItems.reduce(
			(acc, item) => acc + item.marketPrice * (item.quantity || 1),
			0
		);
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="absolute inset-0 bg-black/80 backdrop-blur-sm"
					/>

					{/* Modal */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						className="relative w-full max-w-4xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
					>
						{/* Header */}
						<div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
							<div>
								<h2 className="text-xl font-bold text-white">
									Share Inventory
								</h2>
								<p className="text-sm text-gray-400">
									Download a stylish summary of your available
									items to share on social media.
								</p>
							</div>
							<button
								onClick={onClose}
								className="p-2 hover:bg-white/10 rounded-lg transition-colors"
							>
								<X size={20} className="text-gray-400" />
							</button>
						</div>

						{/* Preview Area - Scrollable */}
						<div className="flex-1 overflow-y-auto p-8 bg-black/50 flex justify-center">
							{/* THE CARD TO BE GENERATED */}
							<div
								ref={cardRef}
								className="w-[800px] min-h-[900px] bg-[#0a0a0a] p-10 text-white relative overflow-hidden"
								style={{ fontFamily: 'Inter, sans-serif' }}
							>
								{/* Aesthetic Background */}
								<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60" />
								<div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-60" />

								{/* Header Section */}
								<div className="relative z-10 flex flex-col items-center mb-10 text-center">
									<div className="w-20 h-20 bg-linear-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-2xl shadow-primary/20">
										<ShoppingBag
											size={40}
											className="text-white"
										/>
									</div>
									<h2 className="text-4xl font-black tracking-tight mb-2 uppercase">
										My Shop
									</h2>
									<div className="flex gap-6 mt-4">
										<div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300">
											{availableItems.reduce(
												(acc, i) => acc + i.quantity,
												0
											)}{' '}
											Items Available
										</div>
										<div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-emerald-400">
											Total Value: $
											{getTotalValue().toLocaleString()}
										</div>
									</div>
								</div>

								{/* Product Grid */}
								{availableItems.length === 0 ? (
									<div className="flex items-center justify-center h-64 border-2 border-dashed border-white/10 rounded-3xl bg-white/5 mx-10">
										<p className="text-gray-500 text-lg">
											Inventory is empty
										</p>
									</div>
								) : (
									<div className="grid grid-cols-2 gap-4 relative z-10 px-2">
										{availableItems
											.slice(0, 6)
											.map((item) => (
												<div
													key={item.id}
													className="group relative h-[320px] bg-[#151515] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
												>
													{/* Full Card Image */}
													{item.imageUrl ? (
														<img
															src={item.imageUrl}
															alt={item.name}
															className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
														/>
													) : (
														/* Fallback Pattern if no image */
														<div className="absolute inset-0 bg-[#222] flex flex-col items-center justify-center text-gray-700">
															<ShoppingBag
																size={48}
																className="opacity-10 mb-2"
															/>
															<span className="text-xs font-bold opacity-20 uppercase tracking-widest">
																No Image
															</span>
															{/* Abstract Pattern Overlay */}
															<div
																className="absolute inset-0 opacity-10"
																style={{
																	backgroundImage:
																		'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
																	backgroundSize:
																		'24px 24px',
																}}
															></div>
														</div>
													)}

													{/* Dark Gradient Overlay for Text Readability */}
													<div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90" />

													{/* Top Badge (Size) */}
													<div className="absolute top-4 right-4 z-20">
														<div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xs font-bold text-white shadow-lg">
															{item.size}
														</div>
													</div>

													{/* Bottom Content Overlay */}
													<div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col justify-end h-full">
														<div className="translate-y-0 transition-transform duration-300">
															<div className="inline-block px-2 py-0.5 rounded-md bg-primary/20 border border-primary/20 text-[10px] font-bold text-primary uppercase mb-2">
																{item.brand}
															</div>
															<h3 className="font-black text-white text-xl leading-tight mb-3 line-clamp-2">
																{item.name}
															</h3>
															<div className="flex items-center justify-between">
																<div className="flex flex-col">
																	<span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
																		Price
																	</span>
																	<span className="text-2xl font-bold text-white tracking-tight">
																		$
																		{item.marketPrice.toLocaleString()}
																	</span>
																</div>
																{item.quantity >
																	1 && (
																	<div className="text-xs font-medium text-gray-400 bg-black/50 px-2 py-1 rounded-lg backdrop-blur-md border border-white/5">
																		{
																			item.quantity
																		}{' '}
																		available
																	</div>
																)}
															</div>
														</div>
													</div>
												</div>
											))}
									</div>
								)}

								{/* "More" Indicator */}
								{availableItems.length > 6 && (
									<div className="mt-6 text-center relative z-10">
										<span className="inline-block px-4 py-1 rounded-full bg-black/50 border border-white/10 text-gray-400 text-sm backdrop-blur-md">
											+ {availableItems.length - 6} more
											items available
										</span>
									</div>
								)}

								{/* Footer */}
								<div className="absolute bottom-0 left-0 right-0 p-8 border-t border-white/5 bg-linear-to-t from-black/80 to-transparent flex justify-between items-end">
									<div className="text-left">
										<p className="text-primary font-bold text-sm uppercase mb-1">
											How to buy
										</p>
										<p className="text-gray-400 text-sm">
											DM me to purchase any item.
										</p>
									</div>
									<div className="text-right">
										<p className="text-xs text-gray-600 uppercase tracking-widest font-bold">
											Powered BY
										</p>
										<p className="text-white font-bold text-lg">
											RESELLZ
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Footer Actions */}
						<div className="p-6 border-t border-white/10 bg-black/40 flex justify-end gap-3">
							<button
								onClick={onClose}
								className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium"
							>
								Cancel
							</button>
							<button
								onClick={handleDownload}
								disabled={isGenerating}
								className="flex items-center gap-2 px-6 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
							>
								{isGenerating ? (
									<>Generating...</>
								) : statusMsg ? (
									<>
										<Check size={18} /> {statusMsg}
									</>
								) : (
									<>
										<Download size={18} /> Download Image
									</>
								)}
							</button>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}

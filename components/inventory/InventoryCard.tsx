'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal, Tag, Pencil, DollarSign, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { InventoryItem } from '@/types/data';
import { span } from 'framer-motion/client';

interface InventoryCardProps {
	item: InventoryItem;
	onEdit: (item: InventoryItem) => void;
	onSell: (item: InventoryItem) => void;
	onDelete: (id: string) => void;
}

export default function InventoryCard({
	item,
	onEdit,
	onSell,
	onDelete,
}: InventoryCardProps) {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<motion.div
			layout
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
			onMouseLeave={() => setShowMenu(false)}
		>
			{/* Status Badge */}
			<div className="absolute top-3 left-3 z-10">
				<span
					className={`px-2 py-1 text-xs font-bold rounded-full ${
						item.status === 'Available'
							? 'bg-emerald-500/20 text-emerald-400'
							: item.status === 'Sold'
							? 'bg-blue-500/20 text-blue-400'
							: 'bg-amber-500/20 text-amber-400'
					}`}
				>
					{item.status}
				</span>
			</div>

			{/* Action Button & Menu */}
			<div className="absolute top-3 right-3 z-20">
				<button
					onClick={() => setShowMenu(!showMenu)}
					className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
				>
					<MoreHorizontal size={16} />
				</button>

				<AnimatePresence>
					{showMenu && (
						<motion.div
							initial={{ opacity: 0, scale: 0.9, y: 5 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 5 }}
							className="absolute right-0 top-full mt-2 w-32 bg-[#1A1D24] border border-white/10 rounded-xl shadow-xl overflow-hidden flex flex-col z-30"
						>
							<button
								onClick={() => {
									setShowMenu(false);
									onEdit(item);
								}}
								className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white text-left w-full"
							>
								<Pencil size={14} /> Edit
							</button>
							{item.status === 'Available' && (
								<button
									onClick={() => {
										setShowMenu(false);
										onSell(item);
									}}
									className="flex items-center gap-2 px-3 py-2 text-sm text-emerald-400 hover:bg-emerald-500/10 text-left w-full"
								>
									<DollarSign size={14} /> Sell
								</button>
							)}
							<button
								onClick={() => {
									setShowMenu(false);
									onDelete(item.id);
								}}
								className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 text-left w-full"
							>
								<Trash2 size={14} /> Delete
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Image Area */}
			<div className="h-40 w-full bg-white/5 flex items-center justify-center relative">
				{item.imageUrl ? (
					<Image
						src={item.imageUrl}
						alt={item.name}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
						unoptimized
					/>
				) : (
					<Tag className="text-white/20 w-16 h-16" />
				)}
				<div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
			</div>

			{/* Content */}
			<div className="p-4">
				<div className="text-xs text-primary font-semibold mb-1">
					{item.brand}
				</div>
				<h3 className="font-bold text-white mb-1 truncate">
					{item.name}
				</h3>
				<div className="text-xs text-gray-500 mb-4 font-mono flex items-center gap-2">
					<span>{item.sku}</span>
					<span>•</span>
					<span>Size {item.size}</span>
					{(item.quantity || 0) + (item.soldQuantity || 0) > 1 && (
						<>
							<span>•</span>
							<span
								className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
									(item.soldQuantity || 0) > 0
										? 'bg-primary/20 text-primary'
										: 'bg-white/10 text-white'
								}`}
							>
								{item.soldQuantity || 0}/
								{(item.quantity || 0) +
									(item.soldQuantity || 0)}{' '}
								Sold
							</span>
						</>
					)}
				</div>

				<div className="flex items-center justify-between pt-3 border-t border-white/5">
					<div>
						<div className="text-[10px] text-gray-500 uppercase tracking-wider">
							Market Value
						</div>
						<div className="text-white font-bold">
							${item.marketPrice}
						</div>
					</div>
					<div className="text-right">
						<div className="text-[10px] text-gray-500 uppercase tracking-wider">
							Profit
						</div>
						<div className="text-emerald-400 font-bold">
							+${item.marketPrice - item.purchasePrice}
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

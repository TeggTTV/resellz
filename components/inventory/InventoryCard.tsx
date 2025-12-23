'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	MoreHorizontal,
	Tag,
	Pencil,
	DollarSign,
	Trash2,
	Copy,
	MapPin,
	Clock,
} from 'lucide-react';
import Image from 'next/image';
import { InventoryItem } from '@/types/data';
import { differenceInDays, parseISO } from 'date-fns';

interface InventoryCardProps {
	item: InventoryItem;
	onEdit: (item: InventoryItem) => void;
	onSell: (item: InventoryItem) => void;
	onDelete: (id: string) => void;
	onDuplicate: (item: InventoryItem) => void;
	viewMode?: 'grid' | 'list';
}

export default function InventoryCard({
	item,
	onEdit,
	onSell,
	onDelete,
	onDuplicate,
	viewMode = 'grid',
}: InventoryCardProps) {
	const [showMenu, setShowMenu] = useState(false);

	const daysInStock = differenceInDays(new Date(), parseISO(item.dateAdded));
	const isAging = daysInStock > 90;

	if (viewMode === 'list') {
		return (
			<motion.div
				layout
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				className="group bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors relative"
			>
				<div className="flex items-center gap-4 flex-1">
					{/* Small Image */}
					<div className="w-12 h-12 bg-white/5 rounded-lg overflow-hidden relative shrink-0">
						{item.imageUrl ? (
							<Image
								src={item.imageUrl}
								alt={item.name}
								fill
								className="object-cover"
								unoptimized
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center">
								<Tag className="text-white/20" size={16} />
							</div>
						)}
					</div>

					{/* Title & Brand */}
					<div className="min-w-[150px] md:min-w-[200px]">
						<div className="text-xs text-primary font-bold">
							{item.brand}
						</div>
						<div className="font-bold text-white text-sm truncate">
							{item.name}
						</div>
					</div>

					{/* Metadata */}
					<div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
						<div className="flex flex-col">
							<span className="text-[10px] uppercase font-bold text-gray-600">
								SKU
							</span>
							<span className="font-mono">{item.sku}</span>
						</div>
						<div className="flex flex-col">
							<span className="text-[10px] uppercase font-bold text-gray-600">
								Size
							</span>
							<span>{item.size}</span>
						</div>
						{item.binLocation && (
							<div className="flex flex-col">
								<span className="text-[10px] uppercase font-bold text-gray-600">
									Loc
								</span>
								<div className="flex items-center gap-1 text-primary/80">
									<MapPin size={10} />
									<span className="text-xs font-mono">
										{item.binLocation}
									</span>
								</div>
							</div>
						)}
						{isAging && (
							<div
								className="flex flex-col items-center justify-center"
								title={`In stock for ${daysInStock} days`}
							>
								<span className="text-[10px] uppercase font-bold text-amber-500/80">
									Age
								</span>
								<div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-500/10 px-1.5 py-0.5 rounded-md">
									<Clock size={10} />
									<span>{daysInStock}d</span>
								</div>
							</div>
						)}
						<div className="flex flex-col">
							<span className="text-[10px] uppercase font-bold text-gray-600">
								Stock
							</span>
							<span>
								{item.soldQuantity}/
								{item.quantity + item.soldQuantity}
							</span>
						</div>
					</div>
				</div>

				{/* Price & Actions */}
				<div className="flex items-center gap-8">
					<div className="text-right hidden sm:block">
						<div className="text-[10px] text-gray-500 uppercase tracking-wider">
							Profit
						</div>
						<div className="text-emerald-400 font-bold">
							+${item.marketPrice - item.purchasePrice}
						</div>
					</div>

					<div className="relative">
						<button
							onClick={() => setShowMenu(!showMenu)}
							className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
						>
							<MoreHorizontal size={16} />
						</button>

						<AnimatePresence>
							{showMenu && (
								<motion.div
									initial={{ opacity: 0, scale: 0.9, y: 5 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.9, y: 5 }}
									className="absolute right-0 top-full mt-2 w-40 bg-[#1A1D24] border border-white/10 rounded-xl shadow-xl overflow-hidden flex flex-col z-30"
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
									<button
										onClick={() => {
											setShowMenu(false);
											onDuplicate(item);
										}}
										className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white text-left w-full"
									>
										<Copy size={14} /> Duplicate
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
				</div>
				{/* Backdrop for menu */}
				{showMenu && (
					<div
						className="fixed inset-0 z-20"
						onClick={() => setShowMenu(false)}
					/>
				)}
			</motion.div>
		);
	}

	return (
		<motion.div
			layout
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
			onMouseLeave={() => setShowMenu(false)}
		>
			{/* Status Badge */}
			<div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
				<span
					className={`px-2 py-1 text-xs font-bold rounded-full w-fit ${
						item.status === 'Available'
							? 'bg-emerald-500/20 text-emerald-400'
							: item.status === 'Sold'
							? 'bg-blue-500/20 text-blue-400'
							: 'bg-amber-500/20 text-amber-400'
					}`}
				>
					{item.status}
				</span>
				{isAging && (
					<span
						title={`In stock for ${daysInStock} days`}
						className="px-2 py-1 text-xs font-bold rounded-full bg-amber-500/20 text-amber-400 flex items-center gap-1 w-fit"
					>
						<Clock size={10} /> {daysInStock}d
					</span>
				)}
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
							<button
								onClick={() => {
									setShowMenu(false);
									onDuplicate(item);
								}}
								className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white text-left w-full"
							>
								<Copy size={14} /> Clone
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

				{item.binLocation && (
					<div className="flex items-center gap-1.5 mt-2 mb-3 text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-md w-fit">
						<MapPin size={12} className="text-primary" />
						<span className="font-mono">{item.binLocation}</span>
					</div>
				)}

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

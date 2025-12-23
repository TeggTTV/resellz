'use client';

import { useData } from '@/context/DataContext';
import { motion } from 'framer-motion';
import {
	RotateCcw,
	Activity,
	Plus,
	ShoppingBag,
	Edit,
	Trash2,
} from 'lucide-react';

export default function HistoryPage() {
	const { history, undoAction } = useData();

	const getActionIcon = (type: string) => {
		switch (type) {
			case 'ADD_ITEM':
				return <Plus size={20} className="text-emerald-400" />;
			case 'SELL_ITEM':
				return <ShoppingBag size={20} className="text-blue-400" />;
			case 'UPDATE_ITEM':
				return <Edit size={20} className="text-amber-400" />;
			case 'DELETE_ITEM':
				return <Trash2 size={20} className="text-red-400" />;
			default:
				return <Activity size={20} className="text-gray-400" />;
		}
	};

	const getActionColor = (type: string) => {
		switch (type) {
			case 'ADD_ITEM':
				return 'bg-emerald-400/10 border-emerald-400/20';
			case 'SELL_ITEM':
				return 'bg-blue-400/10 border-blue-400/20';
			case 'UPDATE_ITEM':
				return 'bg-amber-400/10 border-amber-400/20';
			case 'DELETE_ITEM':
				return 'bg-red-400/10 border-red-400/20';
			default:
				return 'bg-white/5 border-white/10';
		}
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
						Action History
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.1 }}
						className="text-gray-400"
					>
						Track and revert changes made to your inventory.
					</motion.p>
				</div>
			</div>

			{/* History List */}
			{history.length === 0 ? (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed"
				>
					<div className="mx-auto w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-400 mb-4">
						<Activity size={32} />
					</div>
					<h3 className="text-lg font-bold text-white mb-2">
						No History Yet
					</h3>
					<p className="text-gray-400 max-w-sm mx-auto">
						Actions you perform like adding or selling items will
						appear here.
					</p>
				</motion.div>
			) : (
				<div className="grid gap-3">
					{history.map((action, index) => (
						<motion.div
							key={action.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.05 }}
							className={`flex items-center gap-4 p-4 rounded-xl border ${getActionColor(
								action.type
							)} bg-black/20`}
						>
							<div
								className={`w-12 h-12 rounded-lg flex items-center justify-center bg-black/20`}
							>
								{getActionIcon(action.type)}
							</div>

							<div className="flex-1">
								<h3 className="font-semibold text-white">
									{action.description}
								</h3>
								<p className="text-xs text-gray-400">
									{new Date(
										action.timestamp
									).toLocaleString()}{' '}
									• {action.type.replace('_', ' ')}
								</p>
							</div>

							<button
								onClick={() => undoAction(action.id)}
								className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-colors text-sm text-gray-300 hover:text-white"
								title="Undo this action"
							>
								<RotateCcw size={16} />
								<span className="hidden sm:inline">Undo</span>
							</button>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
}

'use client';

import { useState } from 'react';
import { Bell, ShoppingBag, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const notifications = [
	{
		id: 'sales',
		label: 'New Sales',
		description: 'Get notified when you sell an item.',
		icon: ShoppingBag,
		default: true,
	},
	{
		id: 'price',
		label: 'Price Alerts',
		description: 'Alerts when tracked items hit your target price.',
		icon: TrendingUp,
		default: true,
	},
	{
		id: 'stock',
		label: 'Low Stock',
		description: 'Warnings when inventory levels run low.',
		icon: AlertCircle,
		default: false,
	},
	{
		id: 'news',
		label: 'Market News',
		description: 'Weekly summary of market trends.',
		icon: Bell,
		default: true,
	},
];

export default function NotificationSettings() {
	// Simple state tracking for toggles
	const [toggles, setToggles] = useState<Record<string, boolean>>(
		notifications.reduce(
			(acc, curr) => ({ ...acc, [curr.id]: curr.default }),
			{}
		)
	);

	const handleToggle = (id: string) => {
		setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	return (
		<div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
			<h2 className="text-xl font-bold text-white mb-6">Notifications</h2>

			<div className="space-y-4">
				{notifications.map((item) => (
					<div
						key={item.id}
						className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors"
					>
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-300">
								<item.icon size={20} />
							</div>
							<div>
								<div className="font-bold text-white text-sm md:text-base">
									{item.label}
								</div>
								<div className="text-xs md:text-sm text-gray-500">
									{item.description}
								</div>
							</div>
						</div>

						{/* Toggle Switch */}
						<button
							onClick={() => handleToggle(item.id)}
							className={`relative w-12 h-7 rounded-full transition-colors ${
								toggles[item.id] ? 'bg-primary' : 'bg-white/10'
							}`}
						>
							<motion.div
								className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
								animate={{ x: toggles[item.id] ? 20 : 0 }}
								transition={{
									type: 'spring',
									stiffness: 500,
									damping: 30,
								}}
							/>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

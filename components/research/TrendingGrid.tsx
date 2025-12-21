'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const trendingItems = [
	{
		id: 1,
		name: 'Sony PlayStation 5 Pro',
		category: 'Electronics',
		growth: '+145%',
		price: '$699',
		image: 'bg-blue-500/10',
	},
	{
		id: 2,
		name: 'Adidas Yeezy Slide "Onyx"',
		category: 'Sneakers',
		growth: '+85%',
		price: '$145',
		image: 'bg-gray-800/50',
	},
	{
		id: 3,
		name: 'Supreme Box Logo Hoodie',
		category: 'Streetwear',
		growth: '+32%',
		price: '$450',
		image: 'bg-red-500/10',
	},
	{
		id: 4,
		name: 'iPhone 15 Pro Max',
		category: 'Electronics',
		growth: '-5%',
		price: '$1100',
		image: 'bg-indigo-500/10',
	},
];

export default function TrendingGrid() {
	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<div className="flex items-center gap-2">
					<TrendingUp className="text-primary" size={24} />
					<h2 className="text-xl font-bold text-white">
						Trending Now
					</h2>
				</div>
				<button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
					View All <ArrowRight size={16} />
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{trendingItems.map((item, index) => (
					<Link href={`/dashboard/research/${item.id}`} key={item.id}>
						<motion.div
							whileHover={{ y: -5 }}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: index * 0.1 }}
							className="group cursor-pointer bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/30 transition-all"
						>
							<div
								className={`h-32 w-full ${item.image} flex items-center justify-center relative`}
							>
								{/* Mock Image Placeholder */}
								<div className="opacity-30 font-bold text-2xl tracking-tighter">
									IMG
								</div>
								<div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-bold text-emerald-400 border border-white/10">
									{item.growth}
								</div>
							</div>
							<div className="p-4">
								<div className="text-xs text-gray-500 mb-1">
									{item.category}
								</div>
								<h3 className="font-bold text-white leading-tight mb-2 group-hover:text-primary transition-colors">
									{item.name}
								</h3>
								<div className="text-sm font-medium text-gray-300">
									Avg. Price: {item.price}
								</div>
							</div>
						</motion.div>
					</Link>
				))}
			</div>
		</div>
	);
}

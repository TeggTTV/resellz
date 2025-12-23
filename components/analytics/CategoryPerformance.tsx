'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/context/DataContext';

const COLORS = [
	'stroke-emerald-500',
	'stroke-blue-500',
	'stroke-violet-500',
	'stroke-rose-500',
	'stroke-amber-500',
];

export default function CategoryPerformance() {
	const { sales } = useData();
	const radius = 70;
	const circumference = 2 * Math.PI * radius;

	const totalItemsSold = useMemo(() => {
		return sales.reduce((acc, sale) => acc + (sale.quantitySold || 1), 0);
	}, [sales]);

	const categories = useMemo(() => {
		if (sales.length === 0) return [];

		const brandCounts: Record<string, number> = {};
		let totalSales = 0;

		sales.forEach((sale) => {
			const brand = sale.item.brand || 'Other';
			const qty = sale.quantitySold || 1;
			brandCounts[brand] = (brandCounts[brand] || 0) + qty;
			totalSales += qty;
		});

		const sortedBrands = Object.entries(brandCounts)
			.map(([name, value]) => ({ name, value }))
			.sort((a, b) => b.value - a.value);

		// Take top 4, aggregate rest
		const topBrands = sortedBrands.slice(0, 4);
		const others = sortedBrands
			.slice(4)
			.reduce((acc, curr) => acc + curr.value, 0);

		if (others > 0) {
			topBrands.push({ name: 'Other', value: others });
		}

		return topBrands.map((brand, index) => ({
			name: brand.name,
			value: Math.round((brand.value / totalSales) * 100),
			count: brand.value,
			color: COLORS[index % COLORS.length],
		}));
	}, [sales]);

	return (
		<div className="p-6 bg-white/5 border border-white/10 rounded-2xl h-full flex flex-col">
			<h3 className="text-lg font-bold text-white mb-6">
				Sales by Brand
			</h3>

			{categories.length === 0 ? (
				<div className="flex-1 flex items-center justify-center text-gray-500 min-h-[200px]">
					No sales data yet
				</div>
			) : (
				<>
					<div className="flex-1 flex items-center justify-center relative min-h-50">
						<svg className="w-48 h-48 -rotate-90 transform">
							{categories.map((cat, i) => {
								const dashArray =
									(cat.value / 100) * circumference;
								// Calculate offset based on previous items
								const previousValues = categories
									.slice(0, i)
									.reduce((acc, cur) => acc + cur.value, 0);
								const offset =
									(previousValues / 100) * circumference;

								return (
									<motion.circle
										key={cat.name}
										cx="96"
										cy="96"
										r={radius}
										fill="transparent"
										strokeWidth="24"
										className={cat.color}
										strokeDasharray={`${dashArray} ${circumference}`}
										strokeDashoffset={-offset}
										strokeLinecap="round"
										initial={{
											strokeDasharray: `0 ${circumference}`,
										}}
										animate={{
											strokeDasharray: `${dashArray} ${circumference}`,
										}}
										transition={{
											delay: 0.5,
											duration: 1.5,
										}}
									/>
								);
							})}
						</svg>

						<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
							<span className="text-3xl font-bold text-white">
								{totalItemsSold}
							</span>
							<span className="text-xs text-gray-400">
								Items Sold
							</span>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 mt-6">
						{categories.map((cat) => (
							<div
								key={cat.name}
								className="flex items-center gap-2"
							>
								<div
									className={`w-3 h-3 rounded-full ${cat.color.replace(
										'stroke-',
										'bg-'
									)}`}
								/>
								<span className="text-sm text-gray-300 truncate max-w-[80px]">
									{cat.name}
								</span>
								<span className="text-sm font-bold text-white ml-auto">
									{cat.value}%
								</span>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}

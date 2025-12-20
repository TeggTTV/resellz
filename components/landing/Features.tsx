'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Layers } from 'lucide-react';

const features = [
	{
		title: 'Max Price Estimation',
		description:
			'Our AI analyzes years of selling history to predict the absolute maximum price your item can sell for in the current market.',
		icon: TrendingUp,
		color: 'text-primary',
		bg: 'bg-primary/10',
	},
	{
		title: 'Smart Price Points',
		description:
			'Visualize different pricing tiers and their corresponding profit margins. Know exactly what you earn at every price point.',
		icon: DollarSign,
		color: 'text-blue-400',
		bg: 'bg-blue-400/10',
	},
	{
		title: 'Bulk Selling Analytics',
		description:
			'Moving volume? Calculate how bulk discounts affect your bottom line. Sell 10 items slightly cheaper but maximize total turnaround.',
		icon: Layers,
		color: 'text-accent',
		bg: 'bg-accent/10',
	},
];

export default function Features() {
	return (
		<section id="features" className="py-24 bg-black/50">
			<div className="container mx-auto px-6">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-3xl md:text-5xl font-bold mb-6"
					>
						Features built for{' '}
						<span className="text-primary">Profit</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-gray-400 text-lg"
					>
						Don&apos;t leave money on the table. Resellz gives you
						the data you need to squeeze every dollar out of your
						inventory.
					</motion.p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 + 0.2 }}
							className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
						>
							<div
								className={`w-14 h-14 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6`}
							>
								<feature.icon size={28} />
							</div>
							<h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
								{feature.title}
							</h3>
							<p className="text-gray-400 leading-relaxed">
								{feature.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

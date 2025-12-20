'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
	{
		name: 'Alex M.',
		role: 'Sneaker Reseller',
		content:
			'Resellz completely changed how I price my inventory. The bulk analysis tool alone saved me countless hours and made me an extra $2k last month.',
		rating: 5,
	},
	{
		name: 'Sarah K.',
		role: 'Vintage Clothing',
		content:
			'The profit margins visualization is a game changer. I finally know exactly what items are worth my time and which ones to skip.',
		rating: 5,
	},
	{
		name: 'Jordan T.',
		role: 'Electronics Flipper',
		content:
			'Cleanest interface in the game. It feels like this app was actually built by people who resell, not just random developers.',
		rating: 5,
	},
];

export default function Testimonials() {
	return (
		<section className="py-24 bg-black">
			<div className="container mx-auto px-6">
				<div className="text-center mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-3xl md:text-5xl font-bold mb-6"
					>
						Loved by <span className="text-primary">Resellers</span>
					</motion.h2>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="bg-[#111] p-8 rounded-2xl border border-white/5 relative"
						>
							<div className="flex gap-1 mb-4 text-yellow-500">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star
										key={i}
										size={16}
										fill="currentColor"
									/>
								))}
							</div>
							<p className="text-gray-300 mb-6 leading-relaxed">
								&quot;{testimonial.content}&quot;
							</p>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-blue-500 flex items-center justify-center text-white font-bold">
									{testimonial.name[0]}
								</div>
								<div>
									<div className="font-semibold text-white">
										{testimonial.name}
									</div>
									<div className="text-xs text-gray-500 uppercase tracking-wider">
										{testimonial.role}
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

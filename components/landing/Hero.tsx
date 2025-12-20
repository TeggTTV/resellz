'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function Hero() {
	return (
		<section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
			{/* Background Gradients */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
				<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
				<div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px]" />
			</div>

			<div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
				{/* Text Content */}
				<div className="text-center lg:text-left">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-5xl lg:text-7xl font-bold tracking-tight mb-6"
					>
						Resell Smarter, <br />
						<span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-300">
							Profit Faster.
						</span>
					</motion.h1>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0"
					>
						The ultimate toolkit for modern resellers. Maximize your
						margins with data-driven insights, price history, and
						bulk selling analytics.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
					>
						<Button size="lg">Start Free Trial</Button>
						<Button size="lg" variant="outline">
							View Demo
						</Button>
					</motion.div>
				</div>

				{/* Visual Element */}
				<div className="relative h-100 lg:h-150 w-full items-center justify-center flex">
					{/* Main Floating Card */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="absolute z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
					>
						<div className="flex justify-between items-center mb-6">
							<div>
								<div className="text-sm text-gray-400">
									Estimated Profit
								</div>
								<div className="text-3xl font-bold text-primary">
									+$1,240.50
								</div>
							</div>
							<div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
								+24%
							</div>
						</div>

						<div className="space-y-4">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="flex items-center gap-4 p-3 rounded-lg bg-black/40"
								>
									<div className="w-10 h-10 rounded bg-gray-700/50" />
									<div className="flex-1">
										<div className="h-4 w-24 bg-gray-700/50 rounded mb-2" />
										<div className="h-3 w-16 bg-gray-700/30 rounded" />
									</div>
									<div className="text-right">
										<div className="h-4 w-12 bg-primary/40 rounded" />
									</div>
								</div>
							))}
						</div>
					</motion.div>

					{/* Floating Elements */}
					<motion.div
						animate={{ y: [0, -20, 0] }}
						transition={{
							duration: 4,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
						className="absolute top-10 right-0 lg:-right-4 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-lg z-20"
					>
						<div className="text-xs text-gray-400 mb-1">
							Max Price Detected
						</div>
						<div className="font-bold text-lg">$450.00</div>
					</motion.div>

					<motion.div
						animate={{ y: [0, 20, 0] }}
						transition={{
							duration: 5,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: 1,
						}}
						className="absolute bottom-20 left-0 lg:-left-4 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-lg z-20"
					>
						<div className="text-xs text-gray-400 mb-1">
							Bulk Margin
						</div>
						<div className="font-bold text-lg text-secondary">
							32% Profit
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

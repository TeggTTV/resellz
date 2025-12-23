'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function ContactCTA() {
	return (
		<section className="py-24 relative overflow-hidden">
			{/* Background Glow */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 rounded-full blur-[120px] -z-10" />

			<div className="container mx-auto px-6 max-w-4xl text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12 lg:p-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Ready to maximize your profits?
					</h2>
					<p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
						Join thousands of resellers who are making smarter
						decisions with Resellz. Start your free trial today.
					</p>

					<form className="max-w-md mx-auto space-y-4 mb-8">
						<div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
							<input
								type="email"
								placeholder="Enter your email"
								className="w-full sm:flex-1 bg-black/50 border border-white/10 rounded-full px-6 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
							/>
							<Button className="w-full sm:w-auto">
								Get Started
							</Button>
						</div>
						<p className="text-xs text-gray-500">
							No credit card required for trial.
						</p>
					</form>
				</motion.div>
			</div>
		</section>
	);
}

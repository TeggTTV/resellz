'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Check } from 'lucide-react';

const plans = [
	{
		name: 'Starter',
		price: 'Free',
		period: '',
		description: 'Perfect for hobbyist resellers getting started.',
		features: [
			'50 Item Lookups/mo',
			'Basic Profit Calculator',
			'7-Day Sales History',
			'Community Support',
		],
		cta: 'Start for Free',
		popular: false,
	},
	{
		name: 'Pro',
		price: '$29',
		period: '/month',
		description: 'For serious resellers scaling their business.',
		features: [
			'Unlimited Item Lookups',
			'Advanced Profit & Bulk Analytics',
			'Unlimited Sales History',
			'Market Trends Dashboard',
			'Priority Support',
		],
		cta: 'Get Pro',
		popular: true,
	},
	{
		name: 'Business',
		price: '$99',
		period: '/month',
		description: 'Ultimate power for high-volume operations.',
		features: [
			'Everything in Pro',
			'Team Accounts (up to 5)',
			'API Access',
			'Custom Reporting',
			'Dedicated Account Manager',
		],
		cta: 'Contact Sales',
		popular: false,
	},
];

export default function Pricing() {
	return (
		<section id="pricing" className="py-24 bg-black/50 relative">
			<div className="container mx-auto px-6">
				<div className="text-center mb-16">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-3xl md:text-5xl font-bold mb-6"
					>
						Simple, Transparent{' '}
						<span className="text-primary">Pricing</span>
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className="text-gray-400 text-lg max-w-2xl mx-auto"
					>
						Choose the plan that fits your reselling journey. No
						hidden fees.
					</motion.p>
				</div>

				<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{plans.map((plan, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 + 0.2 }}
							className={`relative rounded-2xl p-8 border ${
								plan.popular
									? 'bg-white/10 border-primary shadow-2xl shadow-primary/20'
									: 'bg-white/5 border-white/10'
							}`}
						>
							{plan.popular && (
								<div className="absolute top-0 right-0 -mt-4 mr-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
									MOST POPULAR
								</div>
							)}

							<h3 className="text-xl font-bold mb-2">
								{plan.name}
							</h3>
							<p className="text-gray-400 text-sm mb-6 h-10">
								{plan.description}
							</p>

							<div className="mb-6">
								<span className="text-4xl font-bold">
									{plan.price}
								</span>
								<span className="text-gray-500 text-sm">
									{plan.period}
								</span>
							</div>

							<div className="space-y-4 mb-8">
								{plan.features.map((feature, i) => (
									<div
										key={i}
										className="flex items-start gap-3"
									>
										<div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
											<Check
												size={12}
												className="text-primary"
											/>
										</div>
										<span className="text-gray-300 text-sm">
											{feature}
										</span>
									</div>
								))}
							</div>

							<Button
								className="w-full"
								variant={plan.popular ? 'primary' : 'outline'}
							>
								{plan.cta}
							</Button>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

const navLinks = [
	{ name: 'Features', href: '#features' },
	{ name: 'How it Works', href: '#how-it-works' },
	{ name: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav
			className={cn(
				'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
				isScrolled
					? 'bg-black/50 backdrop-blur-md py-4 shadow-sm'
					: 'bg-transparent py-6'
			)}
		>
			<div className="container mx-auto px-6 flex items-center justify-between">
				<Link
					href="/"
					className="text-2xl font-bold tracking-tighter text-white"
				>
					Resellz<span className="text-primary">.</span>
				</Link>

				{/* Desktop Nav */}
				<div className="hidden md:flex items-center gap-8">
					{navLinks.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
						>
							{link.name}
						</Link>
					))}
					<Button size="sm" variant="primary">
						Get Started
					</Button>
				</div>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden text-white"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					{isMobileMenuOpen ? <X /> : <Menu />}
				</button>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10 overflow-hidden"
					>
						<div className="flex flex-col items-center gap-6 py-8">
							{navLinks.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									className="text-lg font-medium text-gray-300 hover:text-white"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{link.name}
								</Link>
							))}
							<Button size="md" className="w-full max-w-xs">
								Get Started
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}

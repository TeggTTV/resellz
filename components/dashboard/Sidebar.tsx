'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
	LayoutDashboard,
	Package,
	TrendingUp,
	BarChart3,
	Settings,
	LogOut,
	Menu,
	X,
	History,
} from 'lucide-react';

const menuItems = [
	{ icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
	{ icon: Package, label: 'Inventory', href: '/dashboard/inventory' },
	{ icon: TrendingUp, label: 'Market Research', href: '/dashboard/research' },
	{ icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
	{ icon: History, label: 'History', href: '/dashboard/history' },
	{ icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	return (
		<>
			{/* Mobile Trigger */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white/10 rounded-lg backdrop-blur-md border border-white/10"
			>
				{isOpen ? <X size={24} /> : <Menu size={24} />}
			</button>

			{/* Sidebar Container */}
			<aside
				className={`fixed inset-y-0 left-0 z-40 w-64 bg-black/80 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<div className="h-full flex flex-col p-6">
					{/* Logo */}
					<div className="mb-10 flex items-center gap-2">
						<div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
							R
						</div>
						<span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
							Resellz
						</span>
					</div>

					{/* Navigation */}
					<nav className="flex-1 space-y-2">
						{menuItems.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsOpen(false)}
									className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
										isActive
											? 'text-white'
											: 'text-gray-400 hover:text-white'
									}`}
								>
									{isActive && (
										<motion.div
											layoutId="activeNav"
											className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
											initial={false}
											transition={{
												type: 'spring',
												stiffness: 300,
												damping: 30,
											}}
										/>
									)}
									<item.icon
										size={20}
										className={
											isActive
												? 'text-primary'
												: 'group-hover:text-primary transition-colors'
										}
									/>
									<span className="relative z-10 font-medium">
										{item.label}
									</span>
								</Link>
							);
						})}
					</nav>

					{/* User Profile / Logout */}
					<div className="pt-6 border-t border-white/5">
						<button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
							<LogOut size={20} />
							<span className="font-medium">Sign Out</span>
						</button>
					</div>
				</div>
			</aside>

			{/* Overlay for mobile */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setIsOpen(false)}
						className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
					/>
				)}
			</AnimatePresence>
		</>
	);
}

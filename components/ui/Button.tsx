'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

interface ButtonProps extends HTMLMotionProps<'button'> {
	variant?: 'primary' | 'secondary' | 'outline';
	size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant = 'primary', size = 'md', children, ...props },
		ref
	) => {
		const variants = {
			primary:
				'bg-primary text-white hover:bg-primary-hover border-transparent',
			secondary:
				'bg-secondary text-white hover:bg-blue-600 border-transparent',
			outline:
				'bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40',
		};

		const sizes = {
			sm: 'px-4 py-2 text-sm',
			md: 'px-6 py-3 text-base',
			lg: 'px-8 py-4 text-lg font-semibold',
		};

		return (
			<motion.button
				ref={ref}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className={cn(
					'inline-flex items-center justify-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0a0a0a]',
					variants[variant],
					sizes[size],
					className
				)}
				{...props}
			>
				{children}
			</motion.button>
		);
	}
);

Button.displayName = 'Button';

export default Button;

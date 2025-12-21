import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Resellz - Resell Smarter',
	description: 'The ultimate toolkit for modern resellers.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} antialiased bg-black text-white`}
			>
				{children}
			</body>
		</html>
	);
}

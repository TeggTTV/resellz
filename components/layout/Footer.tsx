import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="bg-black border-t border-white/10 py-12">
			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="text-center md:text-left">
						<h3 className="text-xl font-bold text-white mb-2">
							Resellz<span className="text-primary">.</span>
						</h3>
						<p className="text-gray-400 text-sm">
							Empowering resellers with data-driven insights.
						</p>
					</div>

					<div className="flex gap-8 text-sm text-gray-400">
						<Link
							href="#"
							className="hover:text-white transition-colors"
						>
							Privacy
						</Link>
						<Link
							href="#"
							className="hover:text-white transition-colors"
						>
							Terms
						</Link>
						<Link
							href="#"
							className="hover:text-white transition-colors"
						>
							Twitter
						</Link>
					</div>

					<div className="text-gray-500 text-sm">
						&copy; {new Date().getFullYear()} Resellz Inc.
					</div>
				</div>
			</div>
		</footer>
	);
}

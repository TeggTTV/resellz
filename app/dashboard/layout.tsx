import Sidebar from '@/components/dashboard/Sidebar';
import { DataProvider } from '@/context/DataContext';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<DataProvider>
			<div className="min-h-screen bg-black text-white font-sans selection:bg-primary/30">
				<Sidebar />
				<main className="lg:pl-64 min-h-screen relative">
					<div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-7xl">
						{children}
					</div>
				</main>
			</div>
		</DataProvider>
	);
}

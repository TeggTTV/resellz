import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Testimonials from '@/components/landing/Testimonials';
import ContactCTA from '@/components/landing/ContactCTA';

export default function Home() {
	return (
		<main className="min-h-screen bg-black text-white selection:bg-primary/30">
			<Hero />
			<Features />
			<Testimonials />
			<ContactCTA />
		</main>
	);
}

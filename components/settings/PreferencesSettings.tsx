'use client';

import { Globe, DollarSign, Palette } from 'lucide-react';

export default function PreferencesSettings() {
	return (
		<div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
			<h2 className="text-xl font-bold text-white mb-6">
				App Preferences
			</h2>

			<div className="grid md:grid-cols-2 gap-6">
				<div>
					<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
						Currency
					</label>
					<div className="relative">
						<DollarSign
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
							size={18}
						/>
						<select className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:outline-hidden focus:border-primary/50 transition-colors cursor-pointer">
							<option value="USD">USD ($)</option>
							<option value="EUR">EUR (€)</option>
							<option value="GBP">GBP (£)</option>
							<option value="JPY">JPY (¥)</option>
						</select>
					</div>
				</div>

				<div>
					<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
						Language
					</label>
					<div className="relative">
						<Globe
							className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
							size={18}
						/>
						<select className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white appearance-none focus:outline-hidden focus:border-primary/50 transition-colors cursor-pointer">
							<option value="en">English</option>
							<option value="es">Español</option>
							<option value="fr">Français</option>
							<option value="de">Deutsch</option>
						</select>
					</div>
				</div>

				<div className="md:col-span-2">
					<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
						Theme Accent
					</label>
					<div className="flex gap-3">
						{[
							{
								name: 'Emerald',
								bg: 'bg-emerald-500',
								ring: 'ring-emerald-500',
							},
							{
								name: 'Blue',
								bg: 'bg-blue-500',
								ring: 'ring-blue-500',
							},
							{
								name: 'Violet',
								bg: 'bg-violet-500',
								ring: 'ring-violet-500',
							},
							{
								name: 'Rose',
								bg: 'bg-rose-500',
								ring: 'ring-rose-500',
							},
							{
								name: 'Amber',
								bg: 'bg-amber-500',
								ring: 'ring-amber-500',
							},
						].map((theme, i) => (
							<button
								key={theme.name}
								className={`w-10 h-10 rounded-full ${
									theme.bg
								} ${
									i === 0
										? 'ring-2 ring-offset-2 ring-offset-black ' +
										  theme.ring
										: 'opacity-50 hover:opacity-100'
								} transition-all`}
								title={theme.name}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

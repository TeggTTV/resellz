'use client';

import { useState } from 'react';
import { Camera, User, Mail, MapPin } from 'lucide-react';

export default function ProfileSettings() {
	const [name, setName] = useState('Alex Doe');
	const [email, setEmail] = useState('alex@example.com');
	const [bio, setBio] = useState(
		'Reselling sneakers and vintage finds since 2018.'
	);

	return (
		<div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
			<h2 className="text-xl font-bold text-white mb-6">
				Profile Details
			</h2>

			<div className="flex flex-col md:flex-row gap-8 items-start">
				{/* Avatar Area */}
				<div className="flex flex-col items-center gap-3">
					<div className="w-32 h-32 rounded-full bg-linear-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center relative group cursor-pointer overflow-hidden">
						<span className="text-4xl font-bold text-primary">
							AD
						</span>
						<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
							<Camera className="text-white" size={24} />
						</div>
					</div>
					<button className="text-sm text-primary hover:text-primary-hover font-medium">
						Change Avatar
					</button>
				</div>

				{/* Form Fields */}
				<div className="flex-1 w-full space-y-5">
					<div className="grid md:grid-cols-2 gap-5">
						<div>
							<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
								Display Name
							</label>
							<div className="relative">
								<User
									className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
									size={18}
								/>
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
								/>
							</div>
						</div>
						<div>
							<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
								Email Address
							</label>
							<div className="relative">
								<Mail
									className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
									size={18}
								/>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors"
								/>
							</div>
						</div>
					</div>

					<div>
						<label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
							Bio
						</label>
						<textarea
							rows={4}
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:outline-hidden focus:border-primary/50 transition-colors resize-none"
						/>
					</div>

					<div className="pt-4 flex justify-end">
						<button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all">
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

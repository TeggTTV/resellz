'use client';

import { motion } from 'framer-motion';
import ProfileSettings from '@/components/settings/ProfileSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import PreferencesSettings from '@/components/settings/PreferencesSettings';

export default function SettingsPage() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="max-w-4xl mx-auto pb-12"
		>
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
				<p className="text-gray-400">
					Manage your account, appearance, and notifications.
				</p>
			</div>

			<div className="space-y-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
				>
					<ProfileSettings />
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<PreferencesSettings />
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<NotificationSettings />
				</motion.div>
			</div>
		</motion.div>
	);
}

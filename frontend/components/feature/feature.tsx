'use client';

import { motion } from 'framer-motion';
import {
	BookOpen,
	Calendar,
	ChartBar,
	Lightbulb,
	MessageSquare,
	Users,
} from 'lucide-react';
import Link from 'next/link';

function FeaturesSection() {
	const features = [
		{
			title: 'Interactive Study Tools',
			description:
				'Engage with dynamic flashcards, quizzes, and mind maps to reinforce your learning.',
			icon: <Lightbulb className='w-8 h-8 text-yellow-500' />,
		},
		{
			title: 'Collaborative Learning',
			description:
				'Connect with peers, join study groups, and participate in discussion forums.',
			icon: <Users className='w-8 h-8 text-green-500' />,
		},
		{
			title: 'Personalized Study Plans',
			description:
				'Get a customized learning path based on your goals and current knowledge level.',
			icon: <Calendar className='w-8 h-8 text-blue-500' />,
		},
		{
			title: 'Progress Tracking',
			description:
				'Monitor your improvement with detailed analytics and performance insights.',
			icon: <ChartBar className='w-8 h-8 text-purple-500' />,
		},
		{
			title: 'Vast Resource Library',
			description:
				'Access a wide range of study materials, textbooks, and practice tests.',
			icon: <BookOpen className='w-8 h-8 text-red-500' />,
		},
		{
			title: 'Expert Q&A',
			description:
				'Get your questions answered by subject matter experts and top students.',
			icon: <MessageSquare className='w-8 h-8 text-indigo-500' />,
		},
	];

	return (
		<section className='py-20 bg-gray-50'>
			<div className='max-w-7xl mx-auto px-4'>
				<motion.h2
					className='text-4xl font-bold text-center text-gray-800 mb-16'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}>
					Empowering Features for Effective Learning
				</motion.h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{features.map((feature, index) => (
						<motion.div
							key={index}
							className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}>
							<div className='flex items-center mb-4'>
								<div className='flex-shrink-0 mr-4'>{feature.icon}</div>
								<h3 className='text-xl font-semibold text-gray-800'>
									{feature.title}
								</h3>
							</div>
							<p className='text-gray-600 leading-relaxed'>
								{feature.description}
							</p>
						</motion.div>
					))}
				</div>
				<motion.div
					className='mt-16 text-center'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}>
					<Link
						href='/features'
						className='inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl text-lg font-semibold'>
						Explore All Features
					</Link>
				</motion.div>
			</div>
		</section>
	);
}

export default FeaturesSection;

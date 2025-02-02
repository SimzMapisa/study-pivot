'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';

function CourseOfferingsSection() {
	const courses = [
		{
			title: 'Mathematics',
			description:
				'From algebra to calculus, master the fundamentals and advanced concepts.',
			image: '/placeholder.svg?height=400&width=600',
			icon: (
				<svg
					className='w-6 h-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
					/>
				</svg>
			),
		},
		{
			title: 'Computer Science',
			description:
				'Learn programming, algorithms, and software development principles.',
			image: '/placeholder.svg?height=400&width=600',
			icon: (
				<svg
					className='w-6 h-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
					/>
				</svg>
			),
		},
		{
			title: 'Natural Sciences',
			description:
				'Explore physics, chemistry, and biology through interactive lessons.',
			image: '/placeholder.svg?height=400&width=600',
			icon: (
				<svg
					className='w-6 h-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
					/>
				</svg>
			),
		},
		{
			title: 'Humanities',
			description:
				'Dive into literature, history, and philosophy with expert-led courses.',
			image: '/placeholder.svg?height=400&width=600',
			icon: (
				<svg
					className='w-6 h-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
					/>
				</svg>
			),
		},
		{
			title: 'Social Sciences',
			description:
				'Understand human behavior, societies, and cultures through diverse courses.',
			image: '/placeholder.svg?height=400&width=600',
			icon: (
				<svg
					className='w-6 h-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
					/>
				</svg>
			),
		},
		{
			title: 'Language Learning',
			description:
				'Master new languages with immersive and interactive language courses.',
			image: '/placeholder.svg?height=400&width=600',
			icon: (
				<svg
					className='w-6 h-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129'
					/>
				</svg>
			),
		},
	];

	return (
		<section className='py-20 bg-gray-50'>
			<div className='max-w-7xl mx-auto px-4'>
				<motion.div
					className='text-center mb-16'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}>
					<h2 className='text-4xl font-bold text-gray-800 mb-4'>
						Explore Our Courses
					</h2>
					<p className='text-xl text-gray-600 max-w-2xl mx-auto'>
						Discover a wide range of subjects taught by expert instructors.
						Elevate your knowledge and skills with our comprehensive course
						offerings.
					</p>
				</motion.div>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{courses.map((course, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}>
							<Card className='overflow-hidden hover:shadow-lg transition-shadow duration-300'>
								<div className='relative h-48'>
									<Image
										src={course.image}
										alt={course.title}
										layout='fill'
										objectFit='cover'
									/>
									<div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
										<div className='text-white p-4 rounded-full bg-primary/80'>
											{course.icon}
										</div>
									</div>
								</div>
								<CardContent className='p-6'>
									<h3 className='text-xl font-semibold text-gray-800 mb-2'>
										{course.title}
									</h3>
									<p className='text-gray-600'>{course.description}</p>
								</CardContent>
								<CardFooter className='bg-gray-50 px-6 py-3'>
									<Link
										href={`/courses/${course.title
											.toLowerCase()
											.replace(/\s+/g, '-')}`}
										className='text-primary hover:text-primary/80 font-medium flex items-center'>
										Explore Courses
										<ArrowRight className='ml-2 h-4 w-4' />
									</Link>
								</CardFooter>
							</Card>
						</motion.div>
					))}
				</div>
				<motion.div
					className='mt-16 text-center'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}>
					<Button
						asChild
						size='lg'
						className='px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl text-lg font-semibold'>
						<Link href='/courses'>View All Courses</Link>
					</Button>
				</motion.div>
			</div>
		</section>
	);
}

export default CourseOfferingsSection;

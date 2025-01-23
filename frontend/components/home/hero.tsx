'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Stat from '../stat';

function Header() {
	return (
		<header className='lg:min-h-[800px] flex items-center justify-center relative bg-gradient-to-b from-gray-100 to-gray-200'>
			<div className='w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12'>
				{/* Left Column */}
				<div className='relative'>
					{/* <motion.div
						className='absolute left-8 flex items-center space-x-2'
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}>
						<div className='flex -space-x-4'>
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className='w-10 h-10 rounded-full border-2 border-white overflow-hidden'>
									<Image
										src={`/placeholder.svg?height=40&width=40`}
										alt={`Student ${i}`}
										width={40}
										height={40}
										className='w-full h-full object-cover'
									/>
								</div>
							))}
						</div>
						<span className='text-gray-600 text-sm'>Current Students</span>
					</motion.div> */}

					<motion.div
						className=' relative'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.7 }}>
						<div className='relative w-full h-[600px] mx-auto '>
							<div className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 blur-2xl' />
							<div className='relative w-full h-full rounded-full overflow-hidden border-4 border-white'>
								<Image
									src='/students.jpg'
									alt='Student learning'
									width={600}
									height={600}
									className='w-full h-full object-cover'
								/>
							</div>
							{/* <div className='absolute inset-0 overflow-hidden'>
								<div className='absolute top-[10%] left-[10%] w-px h-[20%] bg-gray-100' />
								<div className='absolute top-[20%] left-[10%] w-[20%] h-px bg-gray-100' />
								<div className='absolute top-[10%] right-[10%] w-px h-[20%] bg-gray-100' />
								<div className='absolute top-[20%] right-[10%] w-[20%] h-px bg-gray-100' />
								<div className='absolute bottom-[10%] left-[10%] w-px h-[20%] bg-gray-100' />
								<div className='absolute bottom-[20%] left-[10%] w-[20%] h-px bg-gray-100' />
								<div className='absolute bottom-[10%] right-[10%] w-px h-[20%] bg-gray-100' />
								<div className='absolute bottom-[20%] right-[10%] w-[20%] h-px bg-gray-100' />
							</div> */}
						</div>
					</motion.div>
				</div>

				{/* Right Column */}
				<div className='flex flex-col justify-center'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7 }}>
						<h1 className='text-5xl font-bold text-gray-800 mb-6'>
							Set your goals and <br />
							excel in your studies.
						</h1>
						<p className='text-gray-600 text-xl mb-8 max-w-xl'>
							Level up your academic journey with personalized learning paths,
							expert tutors, and collaborative study tools.
						</p>

						<div className='space-y-4 mb-12'>
							<motion.div
								className='flex items-center space-x-3 bg-white rounded-full px-4 py-2 w-fit shadow-md'
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.3 }}>
								<div className='w-2 h-2 bg-blue-500 rounded-full' />
								<span className='text-gray-700'>
									Interactive Study Materials (1000+)
								</span>
							</motion.div>

							<motion.div
								className='flex items-center space-x-3 bg-white rounded-full px-4 py-2 w-fit shadow-md'
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.4 }}>
								<div className='w-2 h-2 bg-purple-500 rounded-full' />
								<span className='text-gray-700'>
									Live Tutoring Sessions (24/7)
								</span>
							</motion.div>

							<motion.div
								className='flex items-center space-x-3 bg-white rounded-full px-4 py-2 w-fit shadow-md'
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.5 }}>
								<div className='w-2 h-2 bg-green-500 rounded-full' />
								<span className='text-gray-700'>AI-Powered Learning Tools</span>
							</motion.div>
						</div>

						<div className='grid grid-cols-4 gap-8 mb-8'>
							<Stat value='100K+' label='Active Students' />
							<Stat value='5000+' label='Expert Tutors' />
							<Stat value='1000+' label='Study Resources' />
							<Stat value='14' label='Days Free Trial' />
						</div>

						<motion.div
							className='flex space-x-4'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}>
							<Link
								href='/sign-up'
								className='px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl text-lg font-semibold'>
								Start Learning
							</Link>
							<Link
								href='/about'
								className='px-6 py-3 border-2 border-primary text-primary rounded-md hover:bg-primary/10 transition-colors text-lg font-semibold'>
								Learn More
							</Link>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</header>
	);
}

export default Header;

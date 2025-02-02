'use client';

import Link from 'next/link';
import * as React from 'react';
// import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
	useUser,
} from '@clerk/nextjs';
import { AnimatePresence, motion } from 'framer-motion';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	BookOpen,
	Calendar,
	GraduationCap,
	Library,
	Lightbulb,
	Menu,
	MessageSquare,
	Newspaper,
	ShoppingBag,
	Users,
	Video,
	X,
} from 'lucide-react';
import Image from 'next/image';

const MegaMenu = () => {
	const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
	const { user } = useUser();

	const menuItems = [
		{ title: 'Study', icon: <BookOpen className='w-5 h-5' /> },
		{ title: 'Tutors', icon: <GraduationCap className='w-5 h-5' /> },
		{ title: 'Connect', icon: <Users className='w-5 h-5' /> },
		{ title: 'Shop', icon: <ShoppingBag className='w-5 h-5' /> },
		{ title: 'Resources', icon: <Library className='w-5 h-5' /> },
	];

	return (
		<nav className='bg-white border-b sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between h-16'>
					<div className='flex items-center'>
						<Link href='/' className='flex-shrink-0'>
							<span className='text-2xl font-bold text-primary bg-clip-text bg-gradient-to-r from-primary to-blue-600'>
								<Image
									src='/logo.png'
									alt='StudyPlatform'
									width={200}
									height={50}
									className='w-auto h-10'
								/>
							</span>
						</Link>
						<div className='hidden md:ml-6 md:flex md:space-x-8'>
							{menuItems.map((item) => (
								<MegaMenuItem
									key={item.title}
									title={item.title}
									icon={item.icon}
									activeMenu={activeMenu}
									setActiveMenu={setActiveMenu}
								/>
							))}
						</div>
					</div>
					<div className='hidden md:ml-6 md:flex md:items-center md:space-x-4'>
						<>
							<SignedOut>
								<Button>
									<Link href='/sign-in'>Sign In</Link>
								</Button>
							</SignedOut>
							<SignedIn>
								<span className='mr-1 textbase font-medium text-neutral-500'>{`Hello, ${user?.firstName}`}</span>
								<UserButton />
							</SignedIn>
						</>
					</div>
					<div className='flex items-center md:hidden'>
						<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
							<SheetTrigger asChild>
								<Button
									variant='ghost'
									size='icon'
									className='p-2'
									aria-label='Open main menu'>
									<Menu className='h-8 w-8' />
								</Button>
							</SheetTrigger>
							<SheetContent side='left' className='w-[300px] sm:w-[400px] p-6'>
								<div className='flex items-center justify-between mb-6'>
									<span className='text-2xl font-bold text-primary'>
										StudyPlatform
									</span>
									<Button
										variant='ghost'
										size='icon'
										className='p-2'
										onClick={() => setIsMobileMenuOpen(false)}>
										<X className='h-8 w-8' />
									</Button>
								</div>
								<Accordion type='single' collapsible className='w-full'>
									{menuItems.map((item) => (
										<AccordionItem key={item.title} value={item.title}>
											<AccordionTrigger>
												<div className='flex items-center'>
													{item.icon}
													<span className='ml-2'>{item.title}</span>
												</div>
											</AccordionTrigger>
											<AccordionContent>
												<div className='grid gap-4'>
													{getMegaMenuItems(item.title).map(
														(subItem, index) => (
															<Link
																key={index}
																href={subItem.link}
																className='text-sm text-gray-600 hover:text-primary'
																onClick={() => setIsMobileMenuOpen(false)}>
																{subItem.title}
															</Link>
														)
													)}
												</div>
											</AccordionContent>
										</AccordionItem>
									))}
								</Accordion>

								<div className='mt-6 space-y-4'>
									<>
										<SignedOut>
											<SignInButton />
										</SignedOut>
										<SignedIn>
											<UserButton />
										</SignedIn>
									</>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</nav>
	);
};

const MegaMenuItem = ({
	title,
	// icon,
	activeMenu,
	setActiveMenu,
}: {
	title: string;
	icon: React.ReactNode;
	activeMenu: string | null;
	setActiveMenu: (menu: string | null) => void;
}) => {
	return (
		<div
			className='relative'
			onMouseEnter={() => setActiveMenu(title)}
			onMouseLeave={() => setActiveMenu(null)}>
			<button className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-primary transition-colors'>
				{/* {icon} */}
				<span className='ml-1'>{title}</span>
			</button>
			<AnimatePresence>
				{activeMenu === title && (
					<motion.div
						className='absolute z-10  -left-[600%] mt-6 transform -translate-x-1/2 w-screen max-w-4xl px-2 sm:px-0'
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.2 }}>
						<div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>
							<div className='relative grid gap-8 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2 max-w-5xl mx-auto'>
								{/* <div className="lg:col-span-1">
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=${title}`}
                    alt={`${title} featured image`}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div> */}
								<div className='lg:col-span-2 grid gap-6 sm:grid-cols-2 md:grid-cols-2'>
									{getMegaMenuItems(title).map((item, index) => (
										<Link key={index} href={item.link} className='group block'>
											<div className='flex items-center'>
												<div className='flex-shrink-0'>{item.icon}</div>
												<div className='ml-3'>
													<h3 className='text-base font-medium text-gray-900 group-hover:text-primary transition-colors'>
														{item.title}
													</h3>
													<p className='mt-1 text-sm text-gray-500'>
														{item.description}
													</p>
												</div>
											</div>
										</Link>
									))}
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

const getMegaMenuItems = (category: string) => {
	switch (category) {
		case 'Study':
			return [
				{
					title: 'Solo Study',
					description: 'Focus on individual learning',
					link: '/study/solo',
					icon: <Lightbulb className='h-6 w-6 text-yellow-500' />,
				},
				{
					title: 'Group Study',
					description: 'Collaborate with peers',
					link: '/study/group',
					icon: <Users className='h-6 w-6 text-green-500' />,
				},
				{
					title: 'Flashcards',
					description: 'Create and use digital flashcards',
					link: '/study/flashcards',
					icon: <BookOpen className='h-6 w-6 text-blue-500' />,
				},
				{
					title: 'Study Resources',
					description: 'Access a wide range of materials',
					link: '/study/resources',
					icon: <Library className='h-6 w-6 text-purple-500' />,
				},
				{
					title: 'Note-Taking',
					description: 'Efficient note-taking techniques',
					link: '/study/note-taking',
					icon: <MessageSquare className='h-6 w-6 text-red-500' />,
				},
				{
					title: 'Time Management',
					description: 'Optimize your study schedule',
					link: '/study/time-management',
					icon: <Calendar className='h-6 w-6 text-indigo-500' />,
				},
			];
		case 'Tutors':
			return [
				{
					title: 'Find a Tutor',
					description: 'Search for the perfect tutor',
					link: '/tutors/find',
					icon: <Users className='h-6 w-6 text-blue-500' />,
				},
				{
					title: 'Schedule a Session',
					description: 'Book your next tutoring session',
					link: '/tutors/schedule',
					icon: <Calendar className='h-6 w-6 text-green-500' />,
				},
				{
					title: 'Tutor Reviews',
					description: 'Read what others are saying',
					link: '/tutors/reviews',
					icon: <MessageSquare className='h-6 w-6 text-yellow-500' />,
				},
				{
					title: 'Become a Tutor',
					description: 'Join our tutoring community',
					link: '/tutors/become',
					icon: <GraduationCap className='h-6 w-6 text-purple-500' />,
				},
				{
					title: 'Tutor Training',
					description: 'Enhance your tutoring skills',
					link: '/tutors/training',
					icon: <BookOpen className='h-6 w-6 text-red-500' />,
				},
				{
					title: 'Specialty Tutors',
					description: 'Find tutors for specific subjects',
					link: '/tutors/specialty',
					icon: <Lightbulb className='h-6 w-6 text-indigo-500' />,
				},
			];
		case 'Connect':
			return [
				{
					title: 'Video Conference',
					description: 'Join virtual study sessions',
					link: '/connect/video',
					icon: <Video className='h-6 w-6 text-blue-500' />,
				},
				{
					title: 'Chat',
					description: 'Instant messaging with peers',
					link: '/connect/chat',
					icon: <MessageSquare className='h-6 w-6 text-green-500' />,
				},
				{
					title: 'Discussion Forums',
					description: 'Engage in topic-based discussions',
					link: '/connect/forums',
					icon: <Users className='h-6 w-6 text-yellow-500' />,
				},
				{
					title: 'Study Events',
					description: 'Participate in learning events',
					link: '/connect/events',
					icon: <Calendar className='h-6 w-6 text-purple-500' />,
				},
				{
					title: 'Study Buddies',
					description: 'Find a study partner',
					link: '/connect/buddies',
					icon: <Users className='h-6 w-6 text-red-500' />,
				},
				{
					title: 'Community Projects',
					description: 'Collaborate on group projects',
					link: '/connect/projects',
					icon: <Lightbulb className='h-6 w-6 text-indigo-500' />,
				},
			];
		case 'Shop':
			return [
				{
					title: 'Books',
					description: 'Find textbooks and study guides',
					link: '/shop/books',
					icon: <BookOpen className='h-6 w-6 text-blue-500' />,
				},
				{
					title: 'Stationery',
					description: 'Stock up on essential supplies',
					link: '/shop/stationery',
					icon: <MessageSquare className='h-6 w-6 text-green-500' />,
				},
				{
					title: 'Electronics',
					description: 'Boost your tech for studying',
					link: '/shop/electronics',
					icon: <Lightbulb className='h-6 w-6 text-yellow-500' />,
				},
				{
					title: 'Study Accessories',
					description: 'Enhance your study environment',
					link: '/shop/accessories',
					icon: <ShoppingBag className='h-6 w-6 text-purple-500' />,
				},
				{
					title: 'Digital Tools',
					description: 'Software and apps for learning',
					link: '/shop/digital-tools',
					icon: <Lightbulb className='h-6 w-6 text-red-500' />,
				},
				{
					title: 'Study Snacks',
					description: 'Brain food for long study sessions',
					link: '/shop/snacks',
					icon: <ShoppingBag className='h-6 w-6 text-indigo-500' />,
				},
			];
		case 'Resources':
			return [
				{
					title: 'Study Guides',
					description: 'Comprehensive guides by subject',
					link: '/resources/guides',
					icon: <BookOpen className='h-6 w-6 text-blue-500' />,
				},
				{
					title: 'Practice Tests',
					description: 'Prepare for exams with sample questions',
					link: '/resources/practice-tests',
					icon: <MessageSquare className='h-6 w-6 text-green-500' />,
				},
				{
					title: 'Academic Papers',
					description: 'Access research papers and journals',
					link: '/resources/papers',
					icon: <Newspaper className='h-6 w-6 text-yellow-500' />,
				},
				{
					title: 'Video Tutorials',
					description: 'Learn through visual explanations',
					link: '/resources/video-tutorials',
					icon: <Video className='h-6 w-6 text-purple-500' />,
				},
				{
					title: 'Podcasts',
					description: 'Educational audio content',
					link: '/resources/podcasts',
					icon: <Lightbulb className='h-6 w-6 text-red-500' />,
				},
				{
					title: 'Infographics',
					description: 'Visual summaries of complex topics',
					link: '/resources/infographics',
					icon: <Lightbulb className='h-6 w-6 text-indigo-500' />,
				},
			];
		default:
			return [];
	}
};

export default MegaMenu;

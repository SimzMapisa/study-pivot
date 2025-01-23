import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
	return (
		<footer className='bg-gray-100 border-t'>
			<div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
					<div className='col-span-1 md:col-span-2'>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>
							About StudyPivot
						</h3>
						<p className='text-gray-600 mb-4'>
							Empowering students worldwide with innovative learning tools and
							expert tutoring.
						</p>
						<div className='flex space-x-4'>
							<a
								href='https://twitter.com/studyplatform'
								className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Twitter</span>
								<Twitter className='h-6 w-6' />
							</a>
							<a
								href='https://facebook.com/studyplatform'
								className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Facebook</span>
								<Facebook className='h-6 w-6' />
							</a>
							<a
								href='https://instagram.com/studyplatform'
								className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>Instagram</span>
								<Instagram className='h-6 w-6' />
							</a>
							<a
								href='https://linkedin.com/company/studyplatform'
								className='text-gray-400 hover:text-gray-500'>
								<span className='sr-only'>LinkedIn</span>
								<Linkedin className='h-6 w-6' />
							</a>
						</div>
					</div>
					<div>
						<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4'>
							Resources
						</h3>
						<ul className='space-y-4'>
							<li>
								<Link
									href='/blog'
									className='text-base text-gray-500 hover:text-gray-900'>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href='/guides'
									className='text-base text-gray-500 hover:text-gray-900'>
									Study Guides
								</Link>
							</li>
							<li>
								<Link
									href='/faq'
									className='text-base text-gray-500 hover:text-gray-900'>
									FAQ
								</Link>
							</li>
							<li>
								<Link
									href='/support'
									className='text-base text-gray-500 hover:text-gray-900'>
									Support Center
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4'>
							Company
						</h3>
						<ul className='space-y-4'>
							<li>
								<Link
									href='/about'
									className='text-base text-gray-500 hover:text-gray-900'>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href='/team'
									className='text-base text-gray-500 hover:text-gray-900'>
									Our Team
								</Link>
							</li>
							<li>
								<Link
									href='/careers'
									className='text-base text-gray-500 hover:text-gray-900'>
									Careers
								</Link>
							</li>
							<li>
								<Link
									href='/press'
									className='text-base text-gray-500 hover:text-gray-900'>
									Press
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4'>
							Legal
						</h3>
						<ul className='space-y-4'>
							<li>
								<Link
									href='/privacy'
									className='text-base text-gray-500 hover:text-gray-900'>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href='/terms'
									className='text-base text-gray-500 hover:text-gray-900'>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href='/cookies'
									className='text-base text-gray-500 hover:text-gray-900'>
									Cookie Policy
								</Link>
							</li>
							<li>
								<Link
									href='/accessibility'
									className='text-base text-gray-500 hover:text-gray-900'>
									Accessibility
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className='mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between'>
					<div className='flex space-x-6 md:order-2'>
						<Link href='/sitemap' className='text-gray-400 hover:text-gray-500'>
							Sitemap
						</Link>
						<Link href='/contact' className='text-gray-400 hover:text-gray-500'>
							Contact
						</Link>
					</div>
					<p className='mt-8 text-base text-gray-400 md:mt-0 md:order-1'>
						&copy; 2023 StudyPlatform. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

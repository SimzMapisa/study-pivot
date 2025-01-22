import React from 'react';
import { SignIn } from '@clerk/nextjs';

const Page = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<SignIn />
		</div>
	);
};

export default Page;

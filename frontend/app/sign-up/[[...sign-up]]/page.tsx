import React from 'react';
import { SignUp } from '@clerk/nextjs';

const page = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<SignUp />
		</div>
	);
};

export default page;

// import { redirect } from 'next/navigation';

import RegistrationForm from '@/components/registration/form';

const page = () => {
	return (
		<div className=' min-h-screen flex items-center justify-center'>
			<RegistrationForm />
		</div>
	);
};

export default page;

// import { getUsers } from '../actions/getdata';

const page = async () => {
	// const users = await getUsers();
	return (
		<div className='relative flex   flex-col items-center justify-center h-screen max-w-[400px] mx-auto space-y-4 border border-t-0 border-b-0 border-dashed  after:border-1 after:absolute after:block after:h-screen after:bg-red-600 after:border-red-600 after:ml-10 border-gray-300'>
			<div className='absolute -z-10 flex flex-col w-1/4 items-center justify-center h-screen max-w-[400px] mx-auto space-y-4 border border-t-0 border-b-0 border-dashed after:content-["*"] after:ml-10 border-gray-300'></div>
			<h1 className='text-5xl'>Welcome to your dashboard</h1>
			{/* <p>{JSON.stringify(users, null, 2)}</p> */}
		</div>
	);
};

export default page;

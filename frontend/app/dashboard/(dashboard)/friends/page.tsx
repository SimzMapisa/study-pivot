import { getUsers } from '@/app/actions/getdata';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

import AddFriend from '@/components/dashboard/addbtn';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import Link from 'next/link';

const page = async () => {
	const friends = await getUsers();
	console.log(friends);
	return (
		<div className='flex flex-row flex-wrap gap-8 mt-16'>
			{friends.map((friend) => (
				<div key={friend.email} className='w-80'>
					<FriendCard
						props={{
							...friend,
							dob: new Date(friend.dob),
							friendshipStatus: friend.friendshipStatus,
						}}
					/>
				</div>
			))}
		</div>
	);
};

interface Friend {
	friendshipStatus: string;
	gender: string;
	surname: string;
	name: string;
	_id: string;
	email: string;
	username: string;
	dob: Date;
	userType: string;
	avatar: string;
	school: string;
	languages: string;
}

export const FriendCard = ({ props }: { props: Friend }) => {
	return (
		<Card className='mt-16 text-center px-2 bg-white  rounded-2xl border-2 '>
			<div className=' flex relative '>
				<div className='absolute shadow-xl rounded-2xl shadow-slate-300 overflow-hidden  -top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 bg-center w-fit h-fit'>
					<Image src={props.avatar} alt='avatar' width={300} height={400} />
				</div>
				<CardContent className='mt-24 w-96 '>
					<div className='flex justify-center items-center gap-2 text-base text-neutralSP-700'>
						<div className='w-3 h-3 bg-green-600 rounded-full'></div>Online
					</div>
					<CardTitle className='text-neutral-700 text-2xl font-semibold leading-[-0.5px]'>
						{props.name + ' ' + props.surname}
					</CardTitle>

					<p className='text-neutral-500 text-md pb-2'>@{props.username}</p>
					<div className='flex flex-row  border border-dashed border-slate-300 mb-2 py-2 w-full justify-center items-center'>
						<div className='flex-1 capitalize flex flex-col items-center justify-center'>
							<span className='text-blue-700 font-font-medium text-lg'>
								User Type
							</span>{' '}
							<span className='text-base text-neutral-400'>
								{props.userType}
							</span>
						</div>
						<div className='flex-1 capitalize flex flex-col items-center justify-center border-l border-dashed border-slate-300'>
							<span className='text-blue-700 font-medium text-lg '>Gender</span>{' '}
							<span className='text-base text-neutral-400'>{props.gender}</span>
						</div>
					</div>
					<div className='capitalize text-blue-400 mt-4'>
						{props.userType === 'student' ? (
							<>
								<p className='text-slate-500 pb-1 font-medium text-base'>
									School
								</p>
								<p className='text-base text-neutral-400'>{props.school}</p>
							</>
						) : (
							<>
								<p className='text-slate-500 pb-1 font-medium text-base'>
									Spoken Languages
								</p>
								{props.languages.split(',').map((lang, index) => {
									return (
										<Badge
											key={index}
											className='mx-1 bg-slate-100 text-xs hover:bg-transparent text-blue-500'>
											{lang}
										</Badge>
									);
								})}
							</>
						)}
					</div>
				</CardContent>
			</div>
			<CardFooter className='flex flex-row justify-center items-center gap-8'>
				{props.friendshipStatus === 'accepted' ? (
					<p className='text-green-400 h-10 flex flex-row items-center gap-2'>
						<ThumbsUp />
						<span>Friends</span>
					</p>
				) : (
					<AddFriend id={props._id} />
				)}
				<Link
					href='/'
					className='flex font-medium flex-row items-center justify-center gap-2 text-blue-700'>
					<MessageSquare />
					Message
				</Link>
			</CardFooter>
		</Card>
	);
};

export default page;

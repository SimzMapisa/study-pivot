'use server';

export type userType = {
	name: string;
	surname: string;
	username: string;
	email: string;
	userType: string;
	dob: string;
	phone: string;
	gender: string;
	country: string;
	state: string;
	school: string;
	languages: string;
	profilecompleted: boolean;
};

export async function getUsers(): Promise<userType[]> {
	try {
		const response = await fetch('http://localhost:3000/api/v1/users');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return [];
	}
}

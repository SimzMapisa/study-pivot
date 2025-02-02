'use server';
import { auth } from '@clerk/nextjs/server';
import axios from 'axios';
import { z } from 'zod';

const registerSchema = z.object({
	userType: z.enum(['student', 'tutor']),
	dob: z.string(), // Match form field name
	gender: z.enum(['Male', 'Female', 'Other']), // Match case from form
	phone: z.string(), // Match form field name
	country: z.string(),
	state: z.string().optional(),
	school: z.string().optional(), // Match form field name
	languages: z.string().optional(), // Match form field name
});

export type RegisterState = z.infer<typeof registerSchema>;

export async function register(prevState: unknown, formData: RegisterState) {
	// Validate with updated schema
	try {
		const { getToken } = await auth();
		// // if (!userId) return { errors: 'Not authenticated' };

		// const user = await currentUser();

		const token = await getToken();
		// // Pre-check profile status
		// const profileCheck = await axios.get(
		// 	`http://localhost:3000/api/v1/users/${user?.emailAddresses[0].emailAddress}`,
		// 	{ headers: { Authorization: `Bearer ${token}` } }
		// );

		// if (profileCheck.data.profileComplete) {
		// 	return { errors: 'Profile already completed' };
		// }

		// Get Clerk bearer token

		console.log('Token In action', token);
		const result = registerSchema.parse(formData);

		console.log('data from the form', result);

		const response = await axios({
			method: 'post',
			url: 'http://localhost:3000/api/v1/register',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			data: result,
		});

		// console.log(response);

		// const data = await response.data;
		// console.log(data);

		// // In server action
		// console.log('Registration response in action :', {
		// 	status: response.status,
		// 	data: response.data,
		// });
		if (response.status === 200 || response.status === 201) {
			console.log('before redirect');
			return { success: true, redirectUrl: '/' };
		}

		// Process valid data
		// return redirect('/');
	} catch (error: unknown) {
		if (error instanceof z.ZodError) {
			return { errors: error.errors };
		}

		if (axios.isAxiosError(error)) {
			return { errors: error.response?.data?.message || 'Network Error' };
		}

		return { errors: 'An unexpected error occurred' };
	}
}

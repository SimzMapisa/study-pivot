import {
	clerkClient,
	clerkMiddleware,
	createRouteMatcher,
} from '@clerk/nextjs/server';
import axios from 'axios';
import { NextResponse } from 'next/server';
// import {redirect } from 'next/navigation';

const isProtectedRoute = createRouteMatcher([
	`${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL}`,
	'/dashboard',
	'/api/v1/all', // Protect all API v1 routes
]);

export default clerkMiddleware(async (auth, req) => {
	// Handle public routes
	if (!isProtectedRoute(req)) return NextResponse.next();

	// Handle authentication
	const { userId, getToken } = await auth();
	const token = await getToken();

	// For unauthenticated users trying to access protected routes
	if (!userId && isProtectedRoute(req)) {
		return (await auth()).redirectToSignIn();
	}

	// Handle profile completion checks for authenticated users
	if (userId) {
		const clerk = await clerkClient();
		const user = await clerk.users.getUser(userId);
		const email = user?.emailAddresses[0]?.emailAddress;

		if (email) {
			return handleProfileCompletionRedirect(email, token, req);
		}
		return NextResponse.next();
	}
});

async function handleProfileCompletionRedirect(
	email: string,
	token: string | null,
	req: Request
) {
	// await new Promise((resolve) => setTimeout(resolve, 500));
	try {
		const profileCompleted = await checkProfileStatus(email, token);
		const url = new URL(req.url);
		// // Redirect from registration if profile is complete
		if (profileCompleted && url.pathname === '/register') {
			return NextResponse.redirect(new URL('/', req.url));
		}

		// In handleProfileCompletionRedirect
		if (profileCompleted && url.pathname === '/register') {
			const response = NextResponse.redirect(new URL('/', req.url));
			// Add header to bypass middleware on next load
			response.headers.set('x-middleware-cache', 'no-cache');
			return response;
		}
		// // Redirect to registration if profile is incomplete or user not found
		if (!profileCompleted && url.pathname !== '/register') {
			return NextResponse.redirect(new URL('/register', req.url));
		}

		// if (!profileCompleted) {
		// 	return NextResponse.redirect(new URL('/register', req.url));
		// }

		// return NextResponse.redirect(new URL('/', req.url));
	} catch (error) {
		console.error('Profile check failed:', error);
		return NextResponse.redirect(new URL('/', req.url));
	}
}

// async function handleProfileCompletionRedirect(
// 	email: string,
// 	token: string | null,
// 	req: Request
// ) {
// 	try {
// 		const url = new URL(req.url);

// 		// Allow registration page through without checks
// 		if (url.pathname === '/register') {
// 			return NextResponse.next();
// 		}

// 		const profileCompleted = await checkProfileStatus(email, token);

// 		if (!profileCompleted) {
// 			return NextResponse.redirect(new URL('/register', req.url));
// 		}

// 		return NextResponse.next();
// 	} catch (error) {
// 		console.error('Profile check failed:', error);
// 		return NextResponse.redirect(new URL('/register', req.url));
// 	}
// }

async function checkProfileStatus(
	email: string,
	token: string | null
): Promise<boolean> {
	try {
		const response = await axios.get(
			`http://localhost:5000/api/v1/users/${email}`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				// Add cache-busting parameter
				// params: { t: Date.now() },
			}
		);

		// Ensure this matches the actual field name from your backend response
		return response.data.profilecompleted;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			// User not found in backend database

			console.log('the error.response:====', error.response.data);
			return false;
		}
		console.error('API Error:', error);
		throw new Error('Profile check failed');
	}
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
		'/api/v1/:path*',
	],
};

// import {
// 	clerkClient,
// 	clerkMiddleware,
// 	createRouteMatcher,
// } from '@clerk/nextjs/server';
// import axios from 'axios';
// import { redirect } from 'next/navigation';

// import { NextResponse } from 'next/server';

// const isProtectedRoute = createRouteMatcher([
// 	`${process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL}`,
// 	'/dashboard',
// 	'/api/v1/(.*)', // Protect all API v1 routes
// ]);

// export default clerkMiddleware(async (auth, req) => {
// 	// Handle public routes
// 	if (!isProtectedRoute(req)) return NextResponse.next();

// 	// Handle authentication
// 	const { userId, getToken } = await auth();

// 	const token = await getToken();

// 	// For unauthenticated users trying to access protected routes
// 	if (!userId && isProtectedRoute(req)) {
// 		return (await auth()).redirectToSignIn();
// 	}

// 	// Handle profile completion checks for authenticated users
// 	if (userId) {
// 		const clerk = await clerkClient();
// 		const user = await clerk.users.getUser(userId);
// 		const email = user && user.emailAddresses[0].emailAddress;
// 		if (email) {
// 			return handleProfileCompletionRedirect(email, token, req);
// 		}
// 		return NextResponse.next();
// 	}
// });

// async function handleProfileCompletionRedirect(
// 	email: string,
// 	token: string | null,
// 	req: Request
// ) {
// 	try {
// 		const profileCompleted = await checkProfileStatus(email, token);
// 		const url = new URL(req.url);

// 		// Redirect from registration if profile is complete
// 		if (profileCompleted && url.pathname === '/register') {
// 			return NextResponse.redirect(new URL('/', req.url)); //TODO: change this to /dashboard when the dashboard is ready
// 		}

// 		// Redirect to registration if profile is incomplete
// 		if (!profileCompleted && url.pathname !== '/register') {
// 			return NextResponse.redirect(new URL('/register', req.url));
// 		}

// 		return NextResponse.next();
// 	} catch (error) {
// 		console.error('Profile check failed:', error);
// 		return NextResponse.redirect(new URL('/', req.url));
// 	}
// }

// async function checkProfileStatus(
// 	email: string,
// 	token: string | null
// ): Promise<boolean> {
// 	try {
// 		const response = await axios.get(
// 			`http://localhost:5000/api/v1/users/${email}`,
// 			{
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Authorization: `Bearer ${token}`,
// 				},
// 			}
// 		);

// 		if (response.status === 404) {
// 			return redirect('/register');
// 		}

// 		return response.data.profileCompleted;
// 	} catch (error) {
// 		console.error('API Error:', error);
// 		throw new Error('Profile check failed');
// 	}
// }

// export const config = {
// 	matcher: [
// 		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
// 		'/api/v1/:path*',
// 	],
// };

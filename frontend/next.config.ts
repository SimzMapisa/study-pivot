import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	rewrites: async () => {
		return [
			// {
			// 	source: '/api/auth/:path',
			// 	destination: '/api/auth/:path*',
			// },
			{
				source: '/api/:path*',
				destination: 'http://localhost:5000/api/:path*',
			},
		];
	},
};

export default nextConfig;

import { PrismaClient } from '@prisma/client';

const isProd = process.env.NODE_ENV === 'production';

const prisma =
	global.prisma ||
	new PrismaClient({
		log: isProd
			? [
					{
						emit: 'stdout',
						level: 'error',
					},
					{
						emit: 'stdout',
						level: 'warn',
					},
			  ]
			: [
					{
						emit: 'event',
						level: 'query',
					},
					{
						emit: 'stdout',
						level: 'error',
					},
					{
						emit: 'stdout',
						level: 'warn',
					},
			  ],
	});

// Development-only logging
if (!isProd) {
	prisma.$on('query', (e) => {
		console.log('Query: ' + e.query);
		console.log('Duration: ' + e.duration + 'ms');
	});
	// Prevent multiple instances during development hot reloading
	global.prisma = prisma;
}

// Handle graceful shutdown for both environments
process.on('beforeExit', async () => {
	await prisma.$disconnect();
});

export default prisma;

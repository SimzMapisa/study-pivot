import { PrismaClient } from '@prisma/client';
import localStrategy from 'passport-local';
import passwordUtil from '../utils/password.js';

const LocalStrategy = localStrategy.Strategy;

const prisma = new PrismaClient();

const passportConfig = (passport) => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				session: true,
			},
			async (username, password, done) => {
				const user = await prisma.user.findUnique({
					where: { email: username },
				});
				if (!user) {
					return done(null, false, {
						message: 'Incorrect username and password combination.',
					});
				}

				const isPasswordValid = await passwordUtil.comparePassword(
					password,
					user.password
				);
				if (!isPasswordValid) {
					return done(null, false, {
						message: 'Incorrect password and password combination.',
					});
				}
				return done(null, user);
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await prisma.user.findUnique({ where: { id } });
			done(null, user);
		} catch (error) {
			done(error);
		}
	});
};

export default passportConfig;

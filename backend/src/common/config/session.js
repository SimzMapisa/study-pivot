import pgSession from 'connect-pg-simple';
import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();

const PgSession = pgSession(session);

export const sessionConfig = {
	store: new PgSession({
		conObject: {
			connectionString: process.env.PG_CONNECTION_STRING,
		},
		tableName: 'session',
		createTableIfMissing: true,
	}),
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	name: 'sid', // Custom cookie name
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7,
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
		sameSite: 'lax',
	},
};

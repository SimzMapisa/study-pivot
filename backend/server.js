import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './src/config/passport.js';
import userRoutes from './src/routes/user/index.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize passport configuration
passportConfig(passport);
//TODO - Implement session management

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: false,
			httpOnly: true,
			maxAge: 7000,
		},
	})
);

//TODO - initialize passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', userRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});

import dotenv from 'dotenv';
import express from 'express';
import expressSession from 'express-session';
import passport from 'passport';
import passportConfig from '../common/config/passport.js';
import { sessionConfig } from '../common/config/session.js';
import { handleError } from '../common/utils/error-handler.js';
import { logInfo } from '../common/utils/logger.js';
import scheduledSessionCleanup from '../jobs/session-cleanup.js';
import scheduledTokenCleanup from '../jobs/token-cleanup.js';
import apiRoutes from './routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware should come before passport
app.use(expressSession(sessionConfig));

// Initialize passport after session
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use('/api/v1', apiRoutes);

// Global error handler - must be added after routes
app.use(handleError);

app.listen(process.env.PORT, () => {
	logInfo(`Server running on port ${process.env.PORT}`);
	scheduledSessionCleanup(); // Start the session cleanup scheduler
	scheduledTokenCleanup(); // Start the token cleanup scheduler
});

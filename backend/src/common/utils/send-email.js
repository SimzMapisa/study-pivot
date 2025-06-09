import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

// Remove the self-invoking function - this is causing issues
async function sendEmail({ to, subject, text, html }) {
	try {
		const info = await transport.sendMail({
			from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
			to,
			subject,
			text,
			html,
		});
		console.log('Email sent:', info.messageId);
		return info;
	} catch (error) {
		console.error('Error sending email:', error);
		throw new Error('Failed to send email');
	}
}

export default sendEmail;

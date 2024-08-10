require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host: 'smtp.outlook.com',
	port: 465, // Puerto seguro para SSL/TLS.
	secure: true, // Utiliza SSL/TLS.
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

const sendEmail = (to, subject, text) => {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to,
		subject,
		text,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Email sent: ' + info.response);
	});
};

module.exports = { sendEmail };

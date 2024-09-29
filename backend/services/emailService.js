const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Outlook',
  auth: {
    user: process.env.OUTLOOK_USER,
    pass: process.env.OUTLOOK_PASS,
  },
});

exports.sendEmail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: process.env.OUTLOOK_USER,
    to: to,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);
};
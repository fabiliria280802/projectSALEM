const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: 'tu-email@outlook.com',
    pass: 'tu-contraseña'
  }
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'tu-email@outlook.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};

module.exports = { sendEmail };

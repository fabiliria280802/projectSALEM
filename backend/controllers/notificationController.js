const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Función para enviar correo de creación de contraseña
exports.sendPasswordCreationEmail = async (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const resetLink = `http://localhost:3000/create-password/${token}`;

  const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
      user: process.env.OUTLOOK_USER,
      pass: process.env.OUTLOOK_PASS,
    },
  });

  const mailOptions = {
    from: process.env.OUTLOOK_USER,
    to: user.email,
    subject: 'Crea tu contraseña',
    text: `Hola ${user.username}, por favor crea tu contraseña en el siguiente enlace: ${resetLink}`,
  };

  await transporter.sendMail(mailOptions);
};

// Función para enviar correo cuando faltan campos en un documento
exports.sendMissingFieldsEmail = async (analysisResult, fileName) => {
  const subject = `Campos faltantes en el documento: ${fileName}`;
  const missingFields = analysisResult.missing_fields.join(', ');
  const text = `
    Estimado/a,

    Se ha detectado que el siguiente documento tiene campos faltantes:

    Documento: ${fileName}
    Campos faltantes: ${missingFields}

    Por favor revise y complete los campos.

    Gracias,
    El equipo de validación de ENAP
  `;

  const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
      user: process.env.OUTLOOK_USER,
      pass: process.env.OUTLOOK_PASS,
    },
  });

  const mailOptions = {
    from: process.env.OUTLOOK_USER,
    to: 'admin@empresa.com', // Cambia esto al correo del destinatario correcto
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);
};
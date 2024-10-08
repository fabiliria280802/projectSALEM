
const jwt = require('jsonwebtoken');
const transporter = require('../helpers/mailer'); // Importa el transporter desde el mailer.js

// notificationController.js
exports.sendPasswordCreationEmail = async (user) => {
  try {
    const resetLink = `http://localhost:5000/api/create-password/${user._id}`; // Ahora usa el ID del usuario

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Crea tu contraseña',
      text: `Hola ${user.username}, por favor crea tu contraseña en el siguiente enlace: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Correo enviado con éxito.');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('No se pudo enviar el correo de creación de contraseña');
  }
};


//TODO> CREAR ESTA FUNCIONALIDAD. Función para enviar correo cuando faltan campos en un documento
/*exports.sendMissingFieldsEmail = async (analysisResult, fileName) => {
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


  const mailOptions = {
    from: process.env.OUTLOOK_USER,
    to: user.email,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);
};*/
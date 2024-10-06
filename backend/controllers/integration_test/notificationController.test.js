const notificationController = require('../notificationController');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

jest.mock('nodemailer'); // Simula nodemailer
jest.mock('jsonwebtoken'); // Simula jsonwebtoken

describe('NotificationController', () => {
  let mockTransporter;

  beforeEach(() => {
    // Simulamos el transporter de nodemailer
    mockTransporter = {
      sendMail: jest.fn().mockResolvedValue(true),
    };
    nodemailer.createTransport.mockReturnValue(mockTransporter);

    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  describe('sendPasswordCreationEmail', () => {
    it('should send a password creation email with a valid token', async () => {
      const mockUser = {
        _id: '123456',
        email: 'user@test.com',
        username: 'testuser',
      };

      // Simula que jwt sign devuelve un token
      jwt.sign.mockReturnValue('mockToken123');

      await notificationController.sendPasswordCreationEmail(mockUser);

      // Verifica que el token fue generado correctamente
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Verifica que sendMail fue llamado con los argumentos correctos
      expect(mockTransporter.sendMail).toHaveBeenCalledWith({
        from: process.env.OUTLOOK_USER,
        to: mockUser.email,
        subject: 'Crea tu contraseña',
        text: `Hola ${mockUser.username}, por favor crea tu contraseña en el siguiente enlace: http://localhost:3000/create-password/mockToken123`,
      });
    });
  });

  describe('sendMissingFieldsEmail', () => {
    it('should send an email with missing fields information', async () => {
      const mockAnalysisResult = {
        missing_fields: ['campo1', 'campo2'],
      };
      const mockFileName = 'documento_test.pdf';

      await notificationController.sendMissingFieldsEmail(mockAnalysisResult, mockFileName);

      // Verifica que sendMail fue llamado con los argumentos correctos
      expect(mockTransporter.sendMail).toHaveBeenCalledWith({
        from: process.env.OUTLOOK_USER,
        to: 'admin@empresa.com',
        subject: `Campos faltantes en el documento: ${mockFileName}`,
        text: `
    Estimado/a,

    Se ha detectado que el siguiente documento tiene campos faltantes:

    Documento: documento_test.pdf
    Campos faltantes: campo1, campo2

    Por favor revise y complete los campos.

    Gracias,
    El equipo de validación de ENAP
  `,
      });
    });
  });
});

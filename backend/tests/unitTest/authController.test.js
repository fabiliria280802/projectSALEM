const authController = require('../../controllers/authController');
const { getSharePointFiles } = require('../../services/sharePointService'); // Asegúrate de usar el nombre correcto

jest.mock('../../services/sharePointService');

describe('AuthController', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  // Aumenta el timeout a 10 segundos (10000 ms) en cada prueba
  it('should return a token and user on successful login', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'testpassword',
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const hashedPassword = require('bcryptjs').hashSync('testpassword', 8);

    // Simula la respuesta de getSharePointFiles
    getSharePointFiles.mockResolvedValue([
      {
        username: 'testuser',
        password: hashedPassword,
        id: '12345',
      },
    ]);

    await authController.login(req, res);

    // Verifica que el método res.json fue llamado con el token y usuario correcto
    expect(res.json).toHaveBeenCalledWith({
      token: expect.any(String),
      user: { id: '12345', username: 'testuser' },
    });
  }, 10000); // Tiempo de espera de 10 segundos

  it('should return 401 if credentials are incorrect', async () => {
    const req = {
      body: {
        username: 'wronguser',
        password: 'wrongpassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simula la respuesta de getSharePointFiles
    getSharePointFiles.mockResolvedValue([
      {
        username: 'testuser',
        password: 'hashedpassword',
        id: '12345',
      },
    ]);

    await authController.login(req, res);

    // Verifica que el código de estado sea 401 (no autorizado)
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Credenciales incorrectas',
    });
  }, 10000); // Tiempo de espera de 10 segundos

  it('should return 500 if there is an error during authentication', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'testpassword',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simula el rechazo de la promesa en getSharePointFiles
    getSharePointFiles.mockRejectedValue(
      new Error('Error fetching data from SharePoint'),
    );

    await authController.login(req, res);

    // Verifica que el código de estado sea 500 (error del servidor)
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error al autenticar',
      error: 'Error fetching data from SharePoint',
    });
  }, 10000); // Tiempo de espera de 10 segundos
});
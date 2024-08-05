const authController = require('../controllers/authController');
const User = require('../models/User');

jest.mock('../models/User');

describe('AuthController', () => {
  it('should return a token and user on successful login', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'testpassword',
      },
    };
    const res = {
      json: jest.fn(),
    };

    User.findOne.mockResolvedValue({
      comparePassword: jest.fn().mockReturnValue(true),
      _id: '12345',
      username: 'testuser',
      role: 'user',
    });

    await authController.login(req, res);

    expect(res.json).toHaveBeenCalledWith({
      token: expect.any(String),
      user: { id: '12345', username: 'testuser', role: 'user' },
    });
  });

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

    User.findOne.mockResolvedValue(null);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Credenciales incorrectas' });
  });
});

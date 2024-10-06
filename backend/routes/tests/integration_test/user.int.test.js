const request = require('supertest'); // Supertest para simular peticiones HTTP
const app = require('../../app'); // Tu app Express
const mongoose = require('mongoose'); // Para manejar la base de datos
const User = require('../../models/User'); // El modelo de usuario

// Pruebas de integración para las rutas de usuario
describe('User Routes Integration Tests', () => {
  // Conexión a la base de datos antes de que empiecen las pruebas
  beforeAll(async () => {
    const mongoURI = 'mongodb://localhost:27017/testdb'; // Configura tu URI de test
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  // Limpiar la colección de usuarios después de cada prueba
  afterEach(async () => {
    await User.deleteMany({});
  });

  // Cerrar la conexión después de todas las pruebas
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test para la ruta de crear usuario
  describe('POST /api/users', () => {
    it('debería crear un nuevo usuario correctamente', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201); // Espera un status 201 (Created)

      // Verificar que el usuario fue creado en la base de datos
      const userInDb = await User.findOne({ email: 'john@example.com' });
      expect(userInDb).not.toBeNull();
      expect(response.body).toHaveProperty('name', 'John Doe');
      expect(response.body).toHaveProperty('email', 'john@example.com');
    });

    it('debería devolver un error 400 si los datos no son válidos', async () => {
      const invalidUser = {
        name: 'Jane Doe',
        email: 'invalidemail', // Email inválido
        password: 'short' // Contraseña demasiado corta
      };

      const response = await request(app)
        .post('/api/users')
        .send(invalidUser)
        .expect(400); // Espera un status 400 (Bad Request)

      // Verificar que el usuario no fue creado
      const userInDb = await User.findOne({ email: 'invalidemail' });
      expect(userInDb).toBeNull();
    });
  });

  // Test para la ruta de obtener usuario por ID
  describe('GET /api/users/:id', () => {
    it('debería devolver un usuario existente', async () => {
      // Primero crear un usuario para probar la obtención
      const user = new User({
        name: 'Alice Doe',
        email: 'alice@example.com',
        password: 'password123'
      });
      await user.save();

      const response = await request(app)
        .get(`/api/users/${user._id}`)
        .expect(200); // Espera un status 200 (OK)

      expect(response.body).toHaveProperty('name', 'Alice Doe');
      expect(response.body).toHaveProperty('email', 'alice@example.com');
    });

    it('debería devolver un error 404 si el usuario no existe', async () => {
      const fakeUserId = new mongoose.Types.ObjectId(); // Generar un ID válido pero que no existe

      await request(app)
        .get(`/api/users/${fakeUserId}`)
        .expect(404); // Espera un status 404 (Not Found)
    });
  });
});

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Configurar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear JSON en las peticiones

// Rutas
app.get('/', (req, res) => {
  res.send('API for');
});

app.use(helmet());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
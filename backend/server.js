require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

// Usa Helmet para mayor seguridad
app.use(helmet());

// Configurar middleware
app.use(bodyParser.json());

// Configurar rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token válido.' });
    }

    const token = authHeader.split(" ")[1]; // Extrae el token después de "Bearer"

    if (!token) {
        return res.status(401).json({ message: 'Token no encontrado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token con la clave secreta
        req.user = decoded; // Almacena los datos decodificados del usuario en la solicitud
        next(); // Continúa al siguiente middleware
    } catch (error) {
        console.error('Error al verificar el token:', error); // Log de error
        return res.status(403).json({ message: 'Token no válido.' }); // Responde con un estado 403 si el token es inválido
    }
};

module.exports = authMiddleware;
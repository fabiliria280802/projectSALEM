// routes/userPublicRoutes.js
const express = require('express');
const router = express.Router();
const {
	getUserByEmail,
	verifyResetCode,
} = require('../controllers/userController');

// Ruta pública para obtener usuario por correo
router.get('/email/:email', getUserByEmail);
router.post('/verify-reset-code', verifyResetCode);

module.exports = router;

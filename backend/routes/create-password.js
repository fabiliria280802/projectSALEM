const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/create-password/:userId', async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;

  try {
    // Busca al usuario por su ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Validación básica de la contraseña
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Contraseña creada con éxito' });
  } catch (error) {
    // Captura cualquier error
    res.status(400).json({ message: 'Error al actualizar la contraseña' });
  }
});

module.exports = router;


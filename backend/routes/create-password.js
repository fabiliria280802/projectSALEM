const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/create-password/:userId', async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      console.error(`Usuario no encontrado con ID: ${userId}`);
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Validar la contraseña
    if (!password || password.length < 6) {
      console.error('Contraseña no válida. Debe tener al menos 6 caracteres.');
      return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Hashear la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Actualizar la contraseña del usuario
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Contraseña creada con éxito' });
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error.message);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});

module.exports = router;
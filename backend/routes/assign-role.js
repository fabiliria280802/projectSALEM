const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/assign-role', async (req, res) => {
  const { userId, role } = req.body;

  if (!['Administrador', 'Gestor', 'Cliente Final'].includes(role)) {
    return res.status(400).json({ message: 'Rol no válido' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: 'Rol asignado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al asignar rol', error: error.message });
  }
});

module.exports = router;

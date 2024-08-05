const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !user.comparePassword(password)) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });

  res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
};

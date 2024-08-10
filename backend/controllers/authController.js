require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getSharePointData } = require('../services/sharePointService');

exports.login = async (req, res) => {
	const { username, password } = req.body;

	// Suponiendo que tienes una lista en SharePoint llamada "Users" con campos "username" y "password"
	const siteUrl = process.env.SHAREPOINT_SITE_URL;
	const listName = 'Users';
	const accessToken = process.env.SHAREPOINT_ACCESS_TOKEN;

	try {
		const users = await getSharePointData(siteUrl, listName, accessToken);
		const user = users.find(user => user.username === username);

		if (!user || !bcrypt.compareSync(password, user.password)) {
			return res.status(401).json({ message: 'Credenciales incorrectas' });
		}

		const token = jwt.sign(
			{ id: user.id, username: user.username },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' },
		);

		res.json({ token, user: { id: user.id, username: user.username } });
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error al autenticar', error: error.message });
	}
};

require('dotenv').config();
const bcrypt = require('bcryptjs');
const {
	getSharePointData,
	addSharePointData,
	updateSharePointData,
	deleteSharePointData,
} = require('../services/sharePointService');

const siteUrl = process.env.SHAREPOINT_SITE_URL;
const listName = 'Users'; // Asegúrate de tener esta lista en SharePoint con los campos necesarios
const accessToken = process.env.SHAREPOINT_ACCESS_TOKEN;

exports.getUsers = async (req, res) => {
	try {
		const users = await getSharePointData(siteUrl, listName, accessToken);
		res.json(users);
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error al obtener usuarios', error: error.message });
	}
};

exports.createUser = async (req, res) => {
	const { username, password, role } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 8);

	const newUser = {
		username,
		password: hashedPassword,
		role,
	};

	try {
		const user = await addSharePointData(
			siteUrl,
			listName,
			newUser,
			accessToken,
		);
		res.status(201).json(user);
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error al crear usuario', error: error.message });
	}
};

exports.updateUser = async (req, res) => {
	const { id } = req.params;
	const { username, password, role } = req.body;

	const updatedUser = {
		username,
		role,
	};

	if (password) {
		updatedUser.password = bcrypt.hashSync(password, 8);
	}

	try {
		await updateSharePointData(siteUrl, listName, id, updatedUser, accessToken);
		res.status(200).json({ message: 'Usuario actualizado correctamente' });
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error al actualizar usuario', error: error.message });
	}
};

exports.deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		await deleteSharePointData(siteUrl, listName, id, accessToken);
		res.status(200).json({ message: 'Usuario eliminado correctamente' });
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error al eliminar usuario', error: error.message });
	}
};

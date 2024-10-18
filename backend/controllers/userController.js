/*
    Description: Authentication logic for login and get user profile
    By: Fabiana Liria
    version: 1.7
*/

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const { sendPasswordCreationEmail } = require('../controllers/notificationController');
const mongoose = require('mongoose');
const { isAdmin } = require('../helpers/roleHelper');

exports.createUser = [
    authMiddleware,
    isAdmin,
    async (req, res, next) => {
        const { name, last_name, phone, company_name, email, role } = req.body;

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                const error = new Error('El usuario ya existe');
                error.statusCode = 400;
                return next(error);
            }

            const newUser = new User({
                name,
                last_name,
                phone,
                company_name,
                email,
                role
            });

            await newUser.save();

            await sendPasswordCreationEmail(newUser);
            const userResponse = {
                name: newUser.name,
                last_name: newUser.last_name,
                phone: newUser.phone,
                company_name: newUser.company_name,
                email: newUser.email,
                role: newUser.role,
            };

            res.status(201).json({
                message: 'Usuario creado exitosamente. Se ha enviado un correo para la creación de la contraseña.',
                user: userResponse
            });
        } catch (error) {
            next(error);
        }
    }
];

exports.getAllUsers = [
    authMiddleware,
    isAdmin,
    async (req, res, next) => {
        try {
            const users = await User.find().select('-password');
            res.json(users);
        } catch (error) {
            next(error);
        }
    }
];

exports.getAUser = [
    authMiddleware,
    async (req, res, next) => {
        try {

            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            return res.status(200).json(user);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al obtener el usuario' });
        }
    }
];

exports.updateUser = [
    authMiddleware,
    isAdmin,
    async (req, res, next) => {
        const { id } = req.params;
        const { phone, company_name, email, role, status } = req.body;

        try {
            const user = await User.findById(id);

            if (!user) {
                const error = new Error('Usuario no encontrado');
                error.statusCode = 404;
                return next(error);
            }
            user.phone = phone || user.phone;
            user.company_name = company_name || user.company_name;
            user.email = email || user.email;
            user.role = role || user.role;
            user.status = status || user.status;

            await user.save();

            res.json({ message: 'Usuario actualizado exitosamente', user });
        } catch (error) {
            next(error);
        }
    }
];

exports.deleteUser = [
    authMiddleware,
    isAdmin,
    async (req, res, next) => {
        const { id } = req.params;

        try {
            const user = await User.findByIdAndDelete(id);

            if (!user) {
                const error = new Error('Usuario no encontrado');
                error.statusCode = 404;
                return next(error);
            }

            res.json({ message: 'Usuario eliminado exitosamente' });
        } catch (error) {
            next(error);
        }
    }
];

exports.changePassword = [
    authMiddleware,
    async (req, res, next) => {
        const { currentUserId, userIdToModify } = req.params;
        const { currentPassword, newPassword } = req.body;

        try {
            if (!mongoose.Types.ObjectId.isValid(currentUserId) || !mongoose.Types.ObjectId.isValid(userIdToModify)) {
                return res.status(400).json({ message: 'ID inválido' });
            }

            const userToModify = await User.findById(userIdToModify);

            if (!userToModify) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            console.log("Usuario encontrado:", userToModify);

            if (currentUserId === userIdToModify) {
                const isMatch = await bcrypt.compare(currentPassword, userToModify.password);

                if (!isMatch) {
                    return res.status(401).json({ message: 'La contraseña actual es incorrecta' });
                }

                const salt = await bcrypt.genSalt(10);
                userToModify.password = await bcrypt.hash(newPassword, salt);
                await userToModify.save();

                return res.json({ message: 'Contraseña actualizada exitosamente' });
            }

            if (req.user.role === 'Administrador' && currentUserId !== userIdToModify) {
                await sendPasswordCreationEmail(userToModify);
                return res.json({ message: 'Correo enviado para que el usuario cree una nueva contraseña.' });
            }

            return res.status(403).json({ message: 'No autorizado' });

        } catch (error) {
            console.error("Error en changePassword:", error);
            next(error);
        }
    }
];


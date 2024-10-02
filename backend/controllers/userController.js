const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Administrador') {
        return res.status(403).json({ message: 'No autorizado, debes ser Administrador' });
    }
    next();
};

// Crear un nuevo usuario (solo Administrador)
exports.createUser = [
    authMiddleware, // Verifica que el usuario esté autenticado
    isAdmin,        // Verifica que el usuario sea administrador
    async (req, res, next) => {
        const { username, password, email, role } = req.body;

        try {
            const existingUser = await User.findOne({ username });

            if (existingUser) {
                const error = new Error('El usuario ya existe');
                error.statusCode = 400;
                return next(error);
            }

            const newUser = new User({
                username,
                password,
                email,
                role
            });

            await newUser.save();

            // Excluir la contraseña del usuario en la respuesta
            const userResponse = {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            };

            res.status(201).json({ message: 'Usuario creado exitosamente', user: userResponse });
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


// Actualizar un usuario (solo Administrador)
exports.updateUser = [
    authMiddleware,
    isAdmin,
    async (req, res, next) => {
        const { id } = req.params;
        const { username, email, role, status } = req.body;

        try {
            const user = await User.findById(id);

            if (!user) {
                const error = new Error('Usuario no encontrado');
                error.statusCode = 404;
                return next(error);
            }

            user.username = username || user.username;
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

// Eliminar un usuario (solo Administrador)
exports.deleteUser = [
    authMiddleware,
    isAdmin,
    async (req, res, next) => {
        const { id } = req.params;

        try {
            const user = await User.findById(id);

            if (!user) {
                const error = new Error('Usuario no encontrado');
                error.statusCode = 404;
                return next(error);
            }

            await user.remove();

            res.json({ message: 'Usuario eliminado exitosamente' });
        } catch (error) {
            next(error);
        }
    }
];

// Cambiar contraseña de un usuario (solo Administrador o usuario propietario)
exports.changePassword = [
    authMiddleware,
    async (req, res, next) => {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        try {
            // Permitir que el propio usuario cambie su contraseña o un administrador
            if (req.user.role !== 'Administrador' && req.user.id !== id) {
                return res.status(403).json({ message: 'No autorizado' });
            }

            const user = await User.findById(id);

            if (!user) {
                const error = new Error('Usuario no encontrado');
                error.statusCode = 404;
                return next(error);
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);

            if (!isMatch) {
                const error = new Error('La contraseña actual es incorrecta');
                error.statusCode = 401;
                return next(error);
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);

            await user.save();

            res.json({ message: 'Contraseña actualizada exitosamente' });
        } catch (error) {
            next(error);
        }
    }
];
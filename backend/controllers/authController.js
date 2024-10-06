/*
    Description: Authentication logic for login and get user profile
    By: Fabiana Liria
    version: 1.5
*/
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            const error = new Error('Usuario no encontrado');
            error.statusCode = 401;
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Contraseña incorrecta');
            error.statusCode = 401;
            return next(error);
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: { id: user._id, username: user.username, role: user.role }
        });

    } catch (error) {
        next(error);
    }
};

exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            const error = new Error('Usuario no encontrado');
            error.statusCode = 404;
            return next(error);
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};
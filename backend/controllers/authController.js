/*
    Description: Authentication logic for login and get user profile.
    By: Fabiana Liria
    version: 1.7
*/
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

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
            {
                id: user._id,
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                company_name: user.company_name,
                phone: user.phone
            },
            process.env.JWT_SECRET,
            { expiresIn: '10h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                company_name: user.company_name,
                phone: user.phone,
                register_date: user.register_date,
                status: user.status,
                last_login: user.last_login
            }
        });

    } catch (error) {
        next(error);
    }
};

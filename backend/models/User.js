const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
        type: String, enum: ['Administrador', 'Gestor', 'Cliente final', 'Sin Asignar'],
        default: 'Sin Asignar'
    },
    register_date: {type: Date, default: Date.now},
    status: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo'},
    last_login: {type: Date, default: Date.now},
    created_by: { type: String, default: 'System' }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { return next(); }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
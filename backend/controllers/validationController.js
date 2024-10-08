/*
    Description: Validation logic for hes, migo and invoice documents
    By: Fabiana Liria
    version: 1.0
*/

const Validation = require('../models/Validation');
const mongoose = require('mongoose');

exports.createValidation = async (req, res) => {
    try {
        const { user_id, ai_model_version, document_id, document_type, validation_status, validation_errors } = req.body;

        if (!['Invoice', 'HES', 'MIGO'].includes(document_type)) {
            return res.status(400).json({ error: 'Tipo de documento inválido' });
        }

        if (!['Approved', 'Rejected'].includes(validation_status)) {
            return res.status(400).json({ error: 'Estado de validación inválido' });
        }

        const validation = new Validation({
            user_id,
            ai_model_version,
            document_id,
            document_type,
            validation_status,
            validation_errors
        });

        const savedValidation = await validation.save();
        res.status(201).json(savedValidation);
    } catch (error) {
        console.error('Error al crear la validación:', error);
        res.status(500).json({ error: 'Error al crear la validación' });
    }
};

exports.getAllValidations = async (req, res) => {
    try {
        const validations = await Validation.find().populate('user_id', 'name email');
        res.status(200).json(validations);
    } catch (error) {
        console.error('Error al obtener las validaciones:', error);
        res.status(500).json({ error: 'Error al obtener las validaciones' });
    }
};

exports.getValidationById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de validación inválido' });
        }

        const validation = await Validation.findById(id).populate('user_id', 'name email');
        if (!validation) {
            return res.status(404).json({ error: 'Validación no encontrada' });
        }

        res.status(200).json(validation);
    } catch (error) {
        console.error('Error al obtener la validación:', error);
        res.status(500).json({ error: 'Error al obtener la validación' });
    }
};

exports.updateValidation = async (req, res) => {
    try {
        const { id } = req.params;
        const { validation_status, validation_errors } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de validación inválido' });
        }

        if (validation_status && !['Approved', 'Rejected'].includes(validation_status)) {
            return res.status(400).json({ error: 'Estado de validación inválido' });
        }

        const updatedValidation = await Validation.findByIdAndUpdate(
            id,
            { validation_status, validation_errors },
            { new: true }
        );

        if (!updatedValidation) {
            return res.status(404).json({ error: 'Validación no encontrada' });
        }

        res.status(200).json(updatedValidation);
    } catch (error) {
        console.error('Error al actualizar la validación:', error);
        res.status(500).json({ error: 'Error al actualizar la validación' });
    }
};

exports.deleteValidation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID de validación inválido' });
        }

        const deletedValidation = await Validation.findByIdAndDelete(id);
        if (!deletedValidation) {
            return res.status(404).json({ error: 'Validación no encontrada' });
        }

        res.status(200).json({ message: 'Validación eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la validación:', error);
        res.status(500).json({ error: 'Error al eliminar la validación' });
    }
};
const mongoose = require('mongoose');

const validationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ai_model_version: { type: String, required: true },
    document_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    document_type: { type: String, enum: ['Invoice', 'HES', 'MIGO'], required: true},
    validation_date: { type: Date, default: Date.now },
    validation_status: { type: String, enum: ['Approved', 'Rejected'], required: true},
    validation_errors: { type: [String] },
});

module.exports = mongoose.model('Validation', validationSchema);
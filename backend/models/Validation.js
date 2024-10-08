const mongoose = require('mongoose');

const validationSchema = new mongoose.Schema({
    document_id: { type: Schema.Types.ObjectId, required: true },
    document_type: {
        type: String,
        enum: ['Invoice', 'HES', 'MIGO'],
        required: true
    },
    validation_status: {
        type: String,
        enum: ['Approved', 'Rejected'],
        required: true
    },
    validation_details: { type: String },
    validation_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Validation', validationSchema);
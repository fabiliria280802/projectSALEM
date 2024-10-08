const mongoose = require('mongoose');

const migoSchema = new mongoose.Schema({
    movement_number: { type: String, required: true, unique: true },
    movement_type: {
        type: String,
        enum: ['Entry', 'Exit', 'Transfer'],
        required: true
    },
    material_description: { type: String, required: true },
    material_code: { type: String, required: true },
    quantity: { type: Number, required: true },
    provider_ruc: { type: String, required: true },
    provider_name: { type: String, required: true },
    destination_warehouse: { type: String, required: true },
    movement_date: { type: Date, required: true },
    total: { type: Number, required: true },
    validation_status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    upload_date: { type: Date, default: Date.now },
    validation_errors: { type: String }
});

module.exports = mongoose.model('MIGO', migoSchema);
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoice_number: { type: String, required: true, unique: true },
    provider_ruc: { type: String, required: true },
    provider_name: { type: String, required: true },
    provider_address: { type: String },
    issue_date: { type: Date, required: true },
    details: [{
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit_price: { type: Number, required: true },
        subtotal: { type: Number, required: true }
    }],
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

module.exports = mongoose.model('Invoice', invoiceSchema);
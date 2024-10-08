const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
    upload_date: { type: Date, default: Date.now },
    invoice_documents: {
        service_invoice: { type: String, required: true },
        accounting_invoice: { type: String, required: true },
        service_contract: { type: String, required: true }
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
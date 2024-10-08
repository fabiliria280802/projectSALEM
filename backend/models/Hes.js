const mongoose = require('mongoose');

const hesSchema = new mongoose.Schema({
    service_code: { type: String, required: true },
    service_description: { type: String, required: true },
    provider_ruc: { type: String, required: true },
    provider_name: { type: String, required: true },
    service_start_date: { type: Date, required: true },
    service_end_date: { type: Date },
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

module.exports = mongoose.model('HES', hesSchema);
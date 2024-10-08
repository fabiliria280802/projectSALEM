const mongoose = require('mongoose');

const hesSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    service_code: { type: String, required: true },
    service_description: { type: String, required: true },
    provider_ruc: { type: String, required: true },
    provider_name: { type: String, required: true },
    service_start_date: { type: Date, required: true },
    service_end_date: { type: Date },
    total: { type: Number, required: true },
    upload_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HES', hesSchema);
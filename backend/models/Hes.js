const mongoose = require('mongoose');

const hesSchema = new mongoose.Schema({
	document_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Document',
	},
	service_code: { type: String },
	service_description: { type: String },
	provider_ruc: { type: String },
	provider_name: { type: String },
	service_start_date: { type: Date},
	service_end_date: { type: Date },
	total: { type: Number },
	upload_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HES', hesSchema);

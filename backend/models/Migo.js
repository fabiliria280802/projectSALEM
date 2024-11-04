const mongoose = require('mongoose');

const migoSchema = new mongoose.Schema({
	document_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Document'
	},
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	movement_number: { type: String, unique: true },
	movement_type: {
		type: String,
		enum: ['Entry', 'Exit', 'Transfer']
	},
	material_description: { type: String },
	material_code: { type: String },
	quantity: { type: Number },
	provider_ruc: { type: String },
	provider_name: { type: String },
	destination_warehouse: { type: String },
	movement_date: { type: Date },
	total: { type: Number },
});

module.exports = mongoose.model('MIGO', migoSchema);

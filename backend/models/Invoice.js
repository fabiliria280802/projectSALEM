const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
	document_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Document',
		required: true,
	},
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	invoice_number: { type: String, unique: true },
	provider_ruc: { type: String },
	provider_name: { type: String },
	provider_address: { type: String },
	issue_date: { type: Date },
	details: [
		{
			description: { type: String },
			quantity: { type: Number },
			unit_price: { type: Number },
			subtotal: { type: Number },
		},
	],
	total: { type: Number },
	upload_date: { type: Date, default: Date.now },
	/* TODO:check if this is necessary
	invoice_documents: {
		service_invoice: { type: String },
		accounting_invoice: { type: Stringe },
		service_contract: { type: String },
	},*/
});

module.exports = mongoose.model('Invoice', invoiceSchema);

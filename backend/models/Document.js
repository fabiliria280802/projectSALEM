const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	ruc: { type: String, required: true },
	contrato: { type: String, required: true },
	tipoDocumento: {
		type: String,
		enum: ['Invoice', 'HES', 'MIGO'],
		required: true,
	},
	file_path: { type: String, required: true },
	related_id: {
		type: mongoose.Schema.Types.ObjectId,
		refPath: 'tipoDocumento',
	},
	created_at: { type: Date, default: Date.now },
	status: {
		type: String,
		enum: ['Enviado','Analizando', 'Aceptado', 'Denegado', 'Revalidación','Transferido a contabilidad','Transferido a control interno' ],
		default: 'Enviado',
	},
	revalidation_manager_name:{
		type: String,
	}
});

module.exports = mongoose.model('Document', documentSchema);

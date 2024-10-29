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
  related_id: { type: mongoose.Schema.Types.ObjectId, refPath: 'tipoDocumento' },
  created_by: {
    type: String,
    default: 'System',
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Document', documentSchema);

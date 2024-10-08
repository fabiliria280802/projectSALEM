const mongoose = require('mongoose');

// Esquema de la tabla ai_metrics
const aiMetricsSchema = new mongoose.Schema({
  validationID: { type: mongoose.Schema.Types.ObjectId, ref: 'Validation', required: true },
  ai_model_version: { type: String, required: true },
  ai_accuracy: { type: Number, required: true },
  ai_confidence_score: { type: Number, required: true },
  false_positives: { type: Number, required: true },
  false_negatives: { type: Number, required: true},
  execution_time: { type: Number, required: true},
  ai_decision_explanation: { type: String },
  human_review_needed: { type: Boolean, default: false},
  date_recorded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AiMetrics', aiMetricsSchema);

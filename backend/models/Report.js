const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    document_type: {
        type: String,
        enum: ['Invoice', 'HES', 'MIGO'],
        required: true
    },
    document_count: { type: Number, required: true },
    approved_documents: { type: Number, required: true },
    rejected_documents: { type: Number, required: true },
    generation_date: { type: Date, default: Date.now },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Report', reportSchema);

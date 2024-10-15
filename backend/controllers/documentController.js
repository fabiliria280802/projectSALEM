const Invoice = require('../models/Invoice');
const HES = require('../models/Hes');
const MIGO = require('../models/Migo');
const AiMetrics = require('../models/AI_metrics');
const fs = require('fs');
const path = require('path');

// Cargar el archivo JSON con los esquemas de documentos
const documentSchemasPath = path.join(__dirname, 'document_schemas.json');
const documentSchemas = JSON.parse(fs.readFileSync(documentSchemasPath, 'utf-8'));

// Función para extraer los valores del texto usando los campos del JSON
function extractValuesFromText(text, fields) {
    let extractedValues = {};
    for (const [key, keyword] of Object.entries(fields)) {
        const regex = new RegExp(`${keyword}:\\s*(.+)`, 'i');
        const match = regex.exec(text);
        extractedValues[key] = match ? match[1].trim() : '';
    }
    return extractedValues;
}

exports.addingDocuments = async (req, res) => {
    const { documentType, text, metrics } = req.body;

    try {
        let extractedValues = {};
        if (documentType === 'Invoice') {
            extractedValues = extractValuesFromText(text, documentSchemas.Invoice.fields);
            const newInvoice = new Invoice({
                user_id: req.body.user_id,
                invoice_number: extractedValues.invoice_number,
                provider_ruc: extractedValues.provider_ruc,
                provider_name: extractedValues.provider_name,
                issue_date: new Date(extractedValues.issue_date),
                total: parseFloat(extractedValues.total)
            });
            await newInvoice.save();
        } else if (documentType === 'HES') {
            extractedValues = extractValuesFromText(text, documentSchemas.HES.fields);
            const newHES = new HES({
                user_id: req.body.user_id,
                service_code: extractedValues.service_code,
                service_description: extractedValues.service_description,
                total: parseFloat(extractedValues.total)
            });
            await newHES.save();
        } else if (documentType === 'MIGO') {
            extractedValues = extractValuesFromText(text, documentSchemas.MIGO.fields);
            const newMIGO = new MIGO({
                user_id: req.body.user_id,
                movement_number: extractedValues.movement_number,
                material_code: extractedValues.material_code,
                total: parseFloat(extractedValues.total)
            });
            await newMIGO.save();
        }

        // Guardar las métricas AI en AiMetrics
        const newAiMetrics = new AiMetrics({
            validationID: req.body.validationID,
            ai_model_version: metrics.ai_model_version,
            ai_accuracy: metrics.ai_accuracy,
            ai_confidence_score: metrics.ai_confidence_score,
            false_positives: metrics.false_positives,
            false_negatives: metrics.false_negatives,
            execution_time: metrics.execution_time,
            ai_decision_explanation: metrics.ai_decision_explanation,
            human_review_needed: metrics.human_review_needed
        });
        await newAiMetrics.save();

        res.status(200).json({ message: 'Documento procesado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error procesando el documento', error });
    }
};
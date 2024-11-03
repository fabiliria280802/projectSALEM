const Document = require('../models/Document');
const Invoice = require('../models/Invoice');
const HES = require('../models/Hes');
const MIGO = require('../models/Migo');
const AiMetrics = require('../models/AI_metrics');
const fs = require('fs');
const path = require('path');

const documentSchemasPath = path.join(__dirname, 'document_schemas.json');
const documentSchemas = JSON.parse(
	fs.readFileSync(documentSchemasPath, 'utf-8'),
);

function extractValuesFromText(text, fields) {
	let extractedValues = {};
	for (const [key, keyword] of Object.entries(fields)) {
		const regex = new RegExp(`${keyword}:\\s*(.+)`, 'i');
		const match = regex.exec(text);
		extractedValues[key] = match ? match[1].trim() : '';
	}
	return extractedValues;
}

/*addingDocuments = async (req, res) => {
	const { documentType, text, metrics } = req.body;
	try {
		let document;
		let extractedValues = {};

		if (documentType === 'Invoice') {
			extractedValues = extractValuesFromText(
				text,
				documentSchemas.Invoice.fields,
			);
			document = new Invoice({
				user_id: req.body.user_id,
				invoice_number: extractedValues.invoice_number,
				provider_ruc: extractedValues.provider_ruc,
				provider_name: extractedValues.provider_name,
				issue_date: new Date(extractedValues.issue_date),
				total: parseFloat(extractedValues.total),
			});
		} else if (documentType === 'HES') {
			extractedValues = extractValuesFromText(text, documentSchemas.HES.fields);
			document = new HES({
				user_id: req.body.user_id,
				service_code: extractedValues.service_code,
				service_description: extractedValues.service_description,
				total: parseFloat(extractedValues.total),
			});
		} else if (documentType === 'MIGO') {
			extractedValues = extractValuesFromText(
				text,
				documentSchemas.MIGO.fields,
			);
			document = new MIGO({
				user_id: req.body.user_id,
				movement_number: extractedValues.movement_number,
				material_code: extractedValues.material_code,
				total: parseFloat(extractedValues.total),
			});
		}

		await document.save();

		const newAiMetrics = new AiMetrics({
			...metrics,
			validationID: req.body.validationID,
		});
		await newAiMetrics.save();

		res.status(200).json({ message: 'Documento procesado correctamente' });
	} catch (error) {
		res.status(500).json({ message: 'Error procesando el documento', error });
	}
};*/

exports.addingDocuments = async (req, res) => {
	try {
		const { ruc, contract, documentType } = req.body;
		const file = req.file;

		if (!file) {
			return res
				.status(400)
				.json({ error: 'No se ha proporcionado un archivo' });
		}

		const newDocument = new Document({
			ruc,
			contrato: contract,
			tipoDocumento: documentType,
			file_path: path.join('data', file.filename),
		});

		await newDocument.save();

		res.status(201).json({ message: 'Documento cargado correctamente' });
	} catch (error) {
		console.error('Error al cargar el documento:', error);
		res
			.status(500)
			.json({ error: 'Error interno del servidor al cargar el documento' });
	}
};

exports.getDocumentById = async (req, res) => {
	const { id } = req.params;
	try {
		const document =
			(await Invoice.findById(id)) ||
			(await HES.findById(id)) ||
			(await MIGO.findById(id));
		if (!document)
			return res.status(404).json({ message: 'Documento no encontrado' });
		res.status(200).json(document);
	} catch (error) {
		res.status(500).json({ message: 'Error obteniendo el documento', error });
	}
};

exports.updateDocument = async (req, res) => {
	const { id } = req.params;
	const { documentType, text } = req.body;
	let updatedData = {};
	if (documentType === 'Invoice') {
		updatedData = extractValuesFromText(text, documentSchemas.Invoice.fields);
	} else if (documentType === 'HES') {
		updatedData = extractValuesFromText(text, documentSchemas.HES.fields);
	} else if (documentType === 'MIGO') {
		updatedData = extractValuesFromText(text, documentSchemas.MIGO.fields);
	}
	try {
		let document;
		if (documentType === 'Invoice') {
			document = await Invoice.findByIdAndUpdate(id, updatedData, {
				new: true,
			});
		} else if (documentType === 'HES') {
			document = await HES.findByIdAndUpdate(id, updatedData, { new: true });
		} else if (documentType === 'MIGO') {
			document = await MIGO.findByIdAndUpdate(id, updatedData, { new: true });
		}
		if (!document)
			return res.status(404).json({ message: 'Documento no encontrado' });
		res.status(200).json(document);
	} catch (error) {
		res.status(500).json({ message: 'Error actualizando el documento', error });
	}
};

exports.getDocumentsList = async (req, res) => {
	try {
		const invoices = await Invoice.find();
		const hes = await HES.find();
		const migos = await MIGO.find();
		const allDocuments = [...invoices, ...hes, ...migos];
		res.status(200).json(allDocuments);
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error obteniendo la lista de documentos', error });
	}
};

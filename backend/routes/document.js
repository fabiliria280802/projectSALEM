const express = require('express');
const router = express.Router();
const { processDocument } = require('../controllers/validationController');
const { sendMissingFieldsEmail } = require('../controllers/notificationController');

router.get('/documents', async (req, res) => {
  try {
    // Obtener documentos de algún servicio como SharePoint
    const files = await getSharePointFiles(siteUrl, listName, accessToken);

    const ocrResults = [];
    for (const file of files) {
      const analysisResult = await processDocument(file);

      // Enviar correo si faltan campos
      if (!analysisResult.valid) {
        await sendMissingFieldsEmail(analysisResult, file.fileName);
      }

      ocrResults.push({ file: file.fileName, content: analysisResult });
    }

    res.json({ results: ocrResults });
  } catch (error) {
    console.error('Error al procesar documentos: ', error);
    res.status(500).json({ message: 'Error al procesar documentos', error: error.message });
  }
});

module.exports = router;

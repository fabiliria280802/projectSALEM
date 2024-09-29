const { processOcr } = require('../services/ocrService');
const { spawn } = require('child_process');
const path = require('path');

exports.processDocument = async (file) => {
  try {
    const filePath = await downloadFileFromSharePoint(file.fileUrl, file.fileName);
    const ocrText = await processOcr(filePath);
    const analysisResult = await analyzeWithPython(ocrText);
    return analysisResult;
  } catch (error) {
    throw new Error('Error al procesar el documento: ' + error.message);
  }
};

const analyzeWithPython = (text) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', ['./analyzeController.py']);

    let result = '';
    let error = '';

    pythonProcess.stdin.write(text);
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const parsedResult = JSON.parse(result);
          resolve(parsedResult);
        } catch (parseError) {
          reject(new Error('Error al parsear la salida de Python: ' + parseError.message));
        }
      } else {
        reject(new Error('Error en el script Python: ' + error));
      }
    });
  });
};
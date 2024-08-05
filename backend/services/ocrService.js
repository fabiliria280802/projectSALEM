const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

async function extractTextFromImage(imagePath) {
  const [result] = await client.textDetection(imagePath);
  const detections = result.textAnnotations;
  return detections.map(text => text.description).join(' ');
}

module.exports = { extractTextFromImage };

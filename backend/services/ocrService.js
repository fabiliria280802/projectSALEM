const { spawn } = require('child_process');

const runOCR = (filePath) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', ['controllers/analyzeController.py', filePath]);

        pythonProcess.stdout.on('data', (data) => {
            resolve(data.toString());
        });

        pythonProcess.stderr.on('data', (data) => {
            reject(`Error: ${data}`);
        });
    });
};

module.exports = { runOCR };


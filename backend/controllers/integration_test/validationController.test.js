const { spawn } = require('child_process');
const validationController = require('../validationController');
const { runOCR } = require('../../services/ocrService');
const { downloadFileFromSharePoint } = require('../../services/sharePointService'); // Asegúrate de importar correctamente

jest.mock('child_process', () => ({
  spawn: jest.fn(),
}));

jest.mock('../../services/ocrService', () => ({
  runOCR: jest.fn(),
}));

jest.mock('../../services/sharePointService', () => ({
    downloadFileFromSharePoint: jest.fn(),
  }));

describe('processDocument', () => {
    it('should process the document and return the analysis result', async () => {
      const mockFile = {
        fileUrl: 'http://sharepoint.com/file.pdf',
        fileName: 'file.pdf',
      };

      runOCR.mockResolvedValue('Texto de OCR simulado');

      const mockFilePath = '/path/to/file.pdf';
      downloadFileFromSharePoint.mockResolvedValue(mockFilePath);

      const mockPythonProcess = {
        stdin: { write: jest.fn(), end: jest.fn() },
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn() },
        on: jest.fn((event, callback) => {
          if (event === 'close') callback(0);
        }),
      };

      spawn.mockReturnValue(mockPythonProcess);

      mockPythonProcess.stdout.on.mockImplementation((event, callback) => {
        if (event === 'data') {
          callback(JSON.stringify({ result: 'Análisis exitoso' }));
        }
      });

      const result = await validationController.processDocument(mockFile);

      expect(result).toEqual({ result: 'Análisis exitoso' });

      expect(downloadFileFromSharePoint).toHaveBeenCalledWith(
        mockFile.fileUrl,
        mockFile.fileName
      );
      expect(runOCR).toHaveBeenCalledWith(mockFilePath);
      expect(spawn).toHaveBeenCalledWith('python3', ['./analyzeController.py']);
    });

    it('should throw an error if the Python process fails', async () => {
      const mockFile = {
        fileUrl: 'http://sharepoint.com/file.pdf',
        fileName: 'file.pdf',
      };

      runOCR.mockResolvedValue('Texto de OCR simulado');
      const mockFilePath = '/path/to/file.pdf';
      downloadFileFromSharePoint.mockResolvedValue(mockFilePath);

      const mockPythonProcess = {
        stdin: { write: jest.fn(), end: jest.fn() },
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn() },
        on: jest.fn((event, callback) => {
          if (event === 'close') callback(1);
        }),
      };

      spawn.mockReturnValue(mockPythonProcess);

      mockPythonProcess.stderr.on.mockImplementation((event, callback) => {
        if (event === 'data') {
          callback('Error en el script Python');
        }
      });

      await expect(validationController.processDocument(mockFile)).rejects.toThrow(
        'Error en el script Python: Error en el script Python'
      );
    });
});
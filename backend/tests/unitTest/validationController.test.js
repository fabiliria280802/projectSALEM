const { spawn } = require('child_process');
const validationController = require('../../controllers/validationController');
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

      // Simula la función runOCR para devolver texto OCR simulado
      runOCR.mockResolvedValue('Texto de OCR simulado');

      // Simula la función downloadFileFromSharePoint
      const mockFilePath = '/path/to/file.pdf';
      downloadFileFromSharePoint.mockResolvedValue(mockFilePath); // Asegúrate de simular correctamente

      // Simula el proceso Python con spawn
      const mockPythonProcess = {
        stdin: { write: jest.fn(), end: jest.fn() },
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn() },
        on: jest.fn((event, callback) => {
          if (event === 'close') callback(0); // Simula el cierre del proceso con éxito
        }),
      };

      spawn.mockReturnValue(mockPythonProcess);

      // Simula la salida del proceso Python
      mockPythonProcess.stdout.on.mockImplementation((event, callback) => {
        if (event === 'data') {
          callback(JSON.stringify({ result: 'Análisis exitoso' })); // Simula la salida de Python
        }
      });

      // Ejecuta la función processDocument
      const result = await validationController.processDocument(mockFile);

      // Verifica que el resultado sea el esperado
      expect(result).toEqual({ result: 'Análisis exitoso' });

      // Verifica que se llamaron las funciones correctamente
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
          if (event === 'close') callback(1); // Simula el cierre del proceso con error
        }),
      };

      spawn.mockReturnValue(mockPythonProcess);

      mockPythonProcess.stderr.on.mockImplementation((event, callback) => {
        if (event === 'data') {
          callback('Error en el script Python'); // Simula un error en el proceso Python
        }
      });

      await expect(validationController.processDocument(mockFile)).rejects.toThrow(
        'Error en el script Python: Error en el script Python'
      );
    });
});
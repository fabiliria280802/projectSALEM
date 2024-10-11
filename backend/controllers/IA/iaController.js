const { exec } = require('child_process');
const path = require('path');
const Invoice = require('../../models/Invoice');  // Modelo de MongoDB

// Función para ejecutar el script de IA y guardar el resultado
exports.analyzeDocument = (req, res) => {
    const filePath = path.join(__dirname, '../../data/factura01-test.pdf');

    // Ejecutar el script de Python
    exec(`python ${path.join(__dirname, 'IA/main.py')} ${filePath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error ejecutando el script: ${error.message}`);
            return res.status(500).send('Error ejecutando la IA.');
        }

        if (stderr) {
            console.error(`Error en el script de IA: ${stderr}`);
            return res.status(500).send('Error en el script de IA.');
        }

        const extractedText = stdout.trim();  // Asumimos que el resultado de analyze_document() es texto

        // Guardar el resultado en la base de datos (por ejemplo, en una tabla Invoice)
        const newInvoice = new Invoice({
            user_id: req.user.id,  // Supongamos que el usuario está autenticado
            invoice_number: "FACT-001",  // Este valor puede ser extraído del texto
            provider_ruc: "1234567890",  // También extraído del texto
            total: 100.00,  // Este valor puede ser calculado
            upload_date: new Date()
        });

        newInvoice.save()
            .then((invoice) => res.status(201).json({ message: 'Factura procesada y guardada', invoice }))
            .catch((err) => res.status(500).json({ error: 'Error guardando la factura en la base de datos' }));
    });
};

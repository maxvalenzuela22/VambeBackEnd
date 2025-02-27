const { Information } = require('../models');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

exports.postCSV = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ message: 'No se recibió un archivo' });
    }

    const filePath = path.join(__dirname, '../uploads/', req.file.originalname);
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            const information = results.map((result) => {
                return Information.create({
                    client: result['Nombre'],
                    email: result['Correo Electronico'],
                    number: result['Numero de Telefono'].toString(),
                    date: new Date(result['Fecha de la Reunion']),
                    seller: result['Vendedor asignado'],
                    closed: result['closed'],     
                    message: result['Transcripcion']
                });
            });

            await Promise.all(information)
                .then(() => {
                    res.status(200).json({ message: 'Data inserted successfully' });
                })
                .catch((err) => {
                    res.status(500).json({ message: 'Internal server error:', err });
        });
})};

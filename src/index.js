const express = require('express');
const path = require('node:path');
const { leerJSON } = require('./archivos');

const PORT = 3000;

async function main() {
    try {
        const rutaArchivo = path.join(__dirname, '..', 'datos', 'instrumentos.json');

        const instrumentos = await leerJSON(rutaArchivo);

        const app = express();

        app.use(express.json());

        app.get('/', (req, res) => {
            res.status(200).json({
                mensaje: 'API de instrumentos musicales disponible'
            });
        });

        app.get('/api/instrumentos', (req, res) => {
            const familia = req.query.familia;

            if (familia) {
                const instrumentosFiltrados = instrumentos.filter(instrumento =>
                    instrumento.familia.toLowerCase() === familia.toLowerCase()
                );

                return res.status(200).json(instrumentosFiltrados);
            }
            res.status(200).json(instrumentos);
        });

        app.get('/api/instrumentos/:id', (req, res) => {
            const id = Number(req.params.id);

            const instrumento = instrumentos.find(instrumento => instrumento.id === id);

            if (!instrumento) {
                return res.status(404).json({ error: 'Instrumento no encontrado' });
            }
            res.status(200).json(instrumento);
        });

        app.post('/api/instrumentos', (req, res) => {
            const { nombre, familia, origen, descripcion, disponible } = req.body;

            if (!nombre || !familia || !origen || !descripcion || disponible === undefined) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }
            const nuevoId = instrumentos.length > 0 ? instrumentos[instrumentos.length - 1].id + 1 : 1;
            const nuevoInstrumento = {
                id: nuevoId,
                nombre,
                familia,
                origen,
                descripcion,
                disponible
            };

            instrumentos.push(nuevoInstrumento);
            res.status(201).json(nuevoInstrumento);
        });

        app.listen(PORT, () => {
            console.log(`Servidor disponible en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Error al iniciar la aplicación:', error.message);
    }
}
main();
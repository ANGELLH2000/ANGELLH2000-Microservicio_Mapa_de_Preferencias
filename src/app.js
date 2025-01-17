import express from 'express';
import authApiKey from './middleware/authApiKey.js';
import services1Routes from './routes/services1.routes.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.send('<h1>Mircoservicio: Mapa de Preferencias</h1>')
});
app.get('/services1', (req, res, next) => {
    res.send('<h1>Mircoservicio: Mapa de Preferencias</h1><p>Servicio 1 - Online</p>')
});

// Middleware de API Key: protege TODAS las rutas que se definan a continuación
app.use(authApiKey);
app.use('/services1',services1Routes)
app.use((err, req, res, next) => {
    console.error(err.message);  // Loguear el error para depuración
    const statusCode = err.status || 500; // Usa el estado del error o 500 si no está especificado
    res.status(statusCode).send({ error: err.message });
});

export default app;
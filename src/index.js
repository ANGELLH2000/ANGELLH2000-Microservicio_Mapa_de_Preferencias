import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PUERTO || 4000;
app.listen(PORT,()=>{
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
})
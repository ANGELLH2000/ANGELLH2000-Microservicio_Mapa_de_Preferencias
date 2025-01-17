import 'dotenv/config';
import { Router } from "express";
import ManagerServices1 from "../controllers/ManagerServices1.controller.js";
import { connectMongoDB, disconnectMongoDB } from '../config/mongoDB_connection.config.js';
const router = Router();

const clientes = JSON.parse(process.env.CLIENTES);
// Mandar consulta
router.post("/:cliente/:id_recomendacion", async (req, res, next) => {
    try {
        const cliente = req.params.cliente;
        const id_recomendacion = req.params.id_recomendacion;
        const { base } = req.body;

        if (!clientes.includes(cliente)) throw new TypeError("Cliente no registrado")
        //Iniciamos conección a Mongo
        await connectMongoDB(cliente)

        const services1 = await ManagerServices1(id_recomendacion, base);
        res.status(200).send(services1)
    } catch (err) {
        disconnectMongoDB()
        next(err);  // Pasa el error al siguiente middleware de errores
    }finally{
        disconnectMongoDB()
    }
});
export default router;


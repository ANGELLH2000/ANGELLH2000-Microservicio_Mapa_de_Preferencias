import { Router } from "express";
import ManagerServices1 from "../controllers/ManagerServices1.controller.js";
const router = Router();

// Mandar consulta
router.post("/:id_recomendacion", async (req, res, next) => {
    const id_recomendacion = req.params.id_recomendacion;
    const { base } = req.body;
    try {
        const services1 = await ManagerServices1(id_recomendacion,base);
        res.status(200).send(services1)
    } catch (err) {
        next(err);  // Pasa el error al siguiente middleware de errores
    }
});
export default router;


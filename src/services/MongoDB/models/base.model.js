import mongoose from "mongoose";
import { name_base_config } from "../../../config/variables.config.js";
//Definimos el documento
let base = {}

name_base_config.forEach(propiedad => {
    base[propiedad] = {
        type: Array,
        default: [],
        lowercase: true,
        required: true
    }
})

const baseSchema = new mongoose.Schema(base)

//Definir el nombre de la collecion

const baseColleccion = "collecion_base";
export const baseModel = mongoose.model(baseColleccion, baseSchema)

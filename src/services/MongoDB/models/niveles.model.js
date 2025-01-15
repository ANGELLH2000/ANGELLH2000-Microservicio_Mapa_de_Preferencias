import mongoose, { Schema } from "mongoose";
import { base_config } from "../../../config/variables.config.js";
//Definimos el documento
const serviceSchema = new mongoose.Schema({
    service_status: {
        type: String,
        default: "not started",
        lowercase: true,
        required: true
    }
}, { _id: false })
const statusSchema = {
    type: String,
    default: "incompleted",
    lowercase: true,
    required: true

}
///
//Genereando los atributos a cada nivel según la config

let atributos_nivel_total = []
let atributos = {}
Object.values(base_config).forEach(nivel => {
    atributos = {}
    atributos = {
        status: statusSchema
    }
    nivel.forEach(propiedades => {
        atributos[propiedades] = { type: serviceSchema }
    })
    atributos_nivel_total.push(atributos)
})
///


////// 
//  PARA HACER CAMBIOS O AGREGAR NIVELES ES AQUI
//////

// Nivel 1
const nivel1_Schema = new mongoose.Schema(atributos_nivel_total[0], { _id: false })
// Nivel 2
const nivel2_Schema = new mongoose.Schema(atributos_nivel_total[1], { _id: false })
// Nivel 3
const nivel3_Schema = new mongoose.Schema(atributos_nivel_total[2], { _id: false })


const baseSchema = new mongoose.Schema({
    status: statusSchema,
    nivel1: { type: nivel1_Schema },
    nivel2: { type: nivel2_Schema },
    nivel3: { type: nivel3_Schema }
})

//Definir el nombre de la collecion

const baseColleccion = "collecion_niveles";
export const nivelModel = mongoose.model(baseColleccion, baseSchema)

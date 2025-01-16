import mongoose, { Schema } from "mongoose";
import { base_config } from "../../../config/variables.config.js";
//Definimos el documento

const id_recomendacionSchema = {
    type: String,
    index: true,
    required: true

}
const statusSchema = {
    type: String,
    default: "incompleted",
    lowercase: true,
    required: true

}
//Genereando los atributos a cada nivel según la config

let atributos_nivel_total = []
let atributos = {}
Object.values(base_config).forEach(nivel => {
    atributos = {}
    atributos = {
        status: statusSchema
    }
    nivel.forEach(propiedades => {
        atributos[propiedades] = statusSchema
    })
    atributos_nivel_total.push(atributos)
})
///


////// 
//  PARA HACER CAMBIOS O AGREGAR NIVELES ES AQUI
//  Agregando los niveles faltantes
//////

// Nivel 1
const nivel1_Schema = new mongoose.Schema(atributos_nivel_total[0], { _id: false })
// Nivel 2
const nivel2_Schema = new mongoose.Schema(atributos_nivel_total[1], { _id: false })
// Nivel 3
const nivel3_Schema = new mongoose.Schema(atributos_nivel_total[2], { _id: false })


const nivelesSchema = new mongoose.Schema({
    id_recomendacion: id_recomendacionSchema,
    status: statusSchema,
    nivel1: { type: nivel1_Schema },
    nivel2: { type: nivel2_Schema },
    nivel3: { type: nivel3_Schema }
})

//Definir el nombre de la collecion

const nivelesColleccion = "collecion_niveles";
export const nivelModel = mongoose.model(nivelesColleccion, nivelesSchema)

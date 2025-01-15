/**
 * Clase para gestionar operaciones de la base de datos en modelos de niveles.
 * Proporciona métodos para buscar, crear y actualizar documentos en la colección de niveles.
 */

// Importa las configuraciones necesarias y el modelo de MongoDB.
import { nivelModel } from '../MongoDB/models/niveles.model.js'
import 'dotenv/config';
import mongoose from "mongoose";
import { name_niveles_config } from '../../config/variables.config.js';

const connectMongoDB = async () => {
    try {
        mongoose.connect(process.env.HOST_DB)
        console.log("DB-connect")
    } catch (error) {
        console.log(error)
    }
}
class MongoDB_Manager {
    constructor() {
        // Inicia la conexión a la base de datos MongoDB al crear una instancia de la clase.
        connectMongoDB()

        /**
         * Busca un documento por su ID en la base de datos.
         * @param {string} id - El ID del documento a buscar.
         * @returns {Array}Si no se encuentra el documento
         * 
         * [false, id,"",false]                
         * @returns {Array} Si encuentra un error en la búsqueda,
         *              
         * [false, id,error.message,false]     
         * @returns {Array}Si se encuentra.
         *              
         * [true, id, Objecto_documento]       
         */
        this.buscarBD = async function (id) {
            try {
                const res = await nivelModel.findById(id)
                if (res === null) {
                    return [false, id,"",false]
                }
                const {_id,__v,...Objeto_documento}=res.toObject()
                let [status,...rev]=Object.keys(Objeto_documento)   
                if(rev.toString()!== name_niveles_config.toString())throw new TypeError (`Si se encontró el id, pero los niveles no coinciden. Se espera: ' ${name_niveles_config} ' y se obtuvo: ' ${rev} '`)
                return[true,id,Objeto_documento]
            } catch (error) {
                console.log("Hubo un error en la perición a la base de datos\n", error.message)
                return [false, id,error.message,false]
            }
        }
        /**
         * Crea un nuevo documento en la base de datos.
         * @param {Object} objecto - El objeto_niveles con los datos del nuevo documento.
         * @returns {Array} - Retorna [false] en caso de error, o [true, id, documento] si se crea con éxito.
         */
        this.crear_documento_enBD = async function (objecto) {
            try {
                const res = await nivelModel.create(objecto)
                const {_id,__v,...Objeto_documento}=res.toObject()
                return [true,_id.toString(),Objeto_documento]
            } catch (error) {
                console.log("Hubo un error en la petición a la base de datos\n", error.message)
                return [false]
            }
        }
        /**
         * Actualiza el documento existente.
         * @param {string} id - El ID del documento a actualizar.
         * @param {Object} object_nivel - Los nuevos valores para el nivel especificado.
         * @returns {Array} - Retorna [false,id,documento,error] en caso de error, o [true, id, documento] si la actualización es exitosa.
         */
        this.actualizar_documento_enBD= async function (id,object) {
            try {
                
                const res = await nivelModel.findByIdAndUpdate(id, object, { new: true })
                const {_id,__v,...Objeto_documento}=res.toObject()
                return [true,id,Objeto_documento]
            } catch (error) {
                console.log("Hubo un error en la actuilzación del documento en la base de datos\n", error.message)
                return [false,id,object,error.message]
            }
        }
    }
    
}
export default MongoDB_Manager;


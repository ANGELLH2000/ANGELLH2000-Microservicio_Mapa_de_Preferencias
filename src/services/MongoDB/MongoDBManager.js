/**
 * Clase para gestionar operaciones de la base de datos en modelos de niveles.
 * Proporciona métodos para buscar, crear y actualizar documentos en la colección de niveles.
 */

// Importa las configuraciones necesarias y el modelo de MongoDB.
import { nivelModel } from '../MongoDB/models/niveles.model.js'
import { name_base_config, name_niveles_config } from '../../config/variables.config.js';
import { baseModel } from './models/base.model.js';


class MongoDB_Manager {
    constructor() {
        // Inicia la conexión a la base de datos MongoDB al crear una instancia de la clase.
        /**
         * Crea un nuevo documento_base en la base de datos.
         * @param {Object} objecto - El objeto_base con los datos del nuevo documento.
         * @returns {Array} - Retorna [false] en caso de error, o [true, id, documento] si se crea con éxito.
         */
        this.crear_documentoBase = async function (objecto) {
            try {
                const res = await baseModel.create(objecto)
                const { _id, __v, ...Objeto_documento } = res.toObject()
                return [true, _id.toString(), Objeto_documento]
            } catch (error) {
                console.log("Hubo un error en la petición a la base de datos\n", error.message)
                return [false]
            }
        }
        /**
         * Busca un documento_base por su ID en la base de datos.
         * @param {string} id - El ID del documento a buscar.
         * @returns {Array}Si no se encuentra el documento
         * 
         * [false, id,"",false]                
         * @returns {Array} Si existe un error en la búsqueda,
         *              
         * [false, id,error.message,false]     
         * @returns {Array}Si se encuentra.
         *              
         * [true, id, Objecto_documento]       
         */
        this.buscar_documentoBase = async function (id) {
            try {
                const res = await baseModel.findById(id)
                if (res === null) return [false, id, "", false]
                const { _id, __v, ...Objeto_documento } = res.toObject()
                if (Object.keys(Objeto_documento).toString() !== name_base_config.toString()) throw new TypeError(`Si se encontró el id, pero las propiedades no coinciden.\nSe espera: ' ${name_base_config.toString()} '\nSe obtuvo: ' ${Object.keys(Objeto_documento).toString()} '`)
                return [true, id, Objeto_documento]

            } catch (error) {
                console.log("(Buscar_documentoBase) Hubo un error en la perición a la base de datos\n", error.message)
                return [false, id, error.message, false]
            }
        }
        /**
         * Actualiza el documento_base existente.
         * @param {string} id - El ID del documento a actualizar.
         * @param {Object} object_nivel - El objeto con los nuevos valores
         * @returns {Array} - Retorna [false,id,documento,error] en caso de error, o [true, id, documento] si la actualización es exitosa.
         */
        this.actualizar_documentoBase = async function (id, object) {
            try {
                const res = await baseModel.findByIdAndUpdate(id, object, { new: true })
                const { _id, __v, ...Objeto_documento } = res.toObject()
                return [true, id, Objeto_documento]
            } catch (error) {
                console.log("(actualizar_documentoBase) Hubo un error en la actuilzación del documento en la base de datos\n", error.message)
                return [false, id, object, error.message]
            }
        }
        /**
         * Crea un nuevo documento_niveles en la base de datos.
         * @param {Object} objecto - El objeto_niveles con los datos del nuevo documento.
         * @returns {Array} - Retorna [false] en caso de error, o [true, id, documento] si se crea con éxito.
         */
        this.crear_documento_Niveles = async function (objecto) {
            try {
                const res = await nivelModel.create(objecto)
                const { _id, __v, id_recomendacion, ...Objeto_documento } = res.toObject()
                return [true, id_recomendacion, Objeto_documento]
            } catch (error) {
                console.log("(crear_documento_Niveles) Hubo un error en la petición a la base de datos\n", error.message)
                return [false]
            }
        }
        /**
         * Busca un documento_Niveles por su id_recomendacion en la base de datos.
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
        /**
         * Crea un nuevo documento_niveles en la base de datos.
         * @param {Object} objecto - El objeto_niveles con los datos del nuevo documento.
         * @returns {Array} - Retorna [false] en caso de error, o [true, id, documento] si se crea con éxito.
         */
        this.buscar_documentoNiveles = async function (id) {
            try {
                const res = await nivelModel.find({ id_recomendacion: id })
                if (res.length === 0) {
                    return [false, id, "", false]
                }
                const { _id, __v, ...Objeto_documento } = res[0].toObject()
                let [id_recomendacion,status, ...rev] = Object.keys(Objeto_documento)
                if (rev.toString() !== name_niveles_config.toString()) throw new TypeError(`Si se encontró el id, pero los niveles no coinciden. Se espera: ' ${name_niveles_config} ' y se obtuvo: ' ${rev} '`)
                return [true, Objeto_documento.id_recomendacion, Objeto_documento]
            } catch (error) {
                console.log("(Buscar_documentoNiveles) Hubo un error en la perición a la base de datos\n", error.message)
                return [false, id, error.message, false]
            }
        }
        /**
         * Actualiza el documento_niveles existente.
         * @param {string} id - El ID del documento a actualizar.
         * @param {Object} object_nivel - Objeto con los nuevos valores
         * @returns {Array} - Retorna [false,id,documento,error] en caso de error, o [true, id, documento] si la actualización es exitosa.
         */
        this.actualizar_documentoNiveles = async function (id, object) {
            try {
                const res = await nivelModel.findOneAndUpdate({ id_recomendacion: id }, object, { new: true })
                const { _id, __v, ...Objeto_documento } = res.toObject()
                return [true, id, Objeto_documento]
            } catch (error) {
                console.log("(actualizar_documentoBase) Hubo un error en la actuilzación del documento en la base de datos\n", error.message)
                return [false, id, object, error.message]
            }
        }
    }

}
export default MongoDB_Manager;


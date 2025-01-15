import { mongo } from "mongoose"
import dataValidationService from "../services/dataValidationService.js"
import MongoDB_Manager from "../services/MongoDB/MongoDBManager.js"
import NivelesManager from "../services/NivelesManager.js"
//Inicio del Servicio
export default async function ManagerServices1(id_recomendacion, base) {
    try {
        //Validacion
        if (!dataValidationService(id_recomendacion, base)) throw new TypeError("Error en la validación")

        //---Instanciamos a MongoManager()
        const Mongo = new MongoDB_Manager()

        //---Instanciamos a NivelesManager()
        const Objecto_documento = new NivelesManager(base)

        //No existe
        if(id_recomendacion==="xxx"){
            //Crear documento en Base de Datos
            const crear= await Mongo.crear_documento_enBD(Objecto_documento.ObjetoDocumento)
            if(crear[0]===false){
                throw new TypeError("Hubo un error en la creacion del ObjetoDocumento en la base de datos")
            }else{
                console.log("Objeto creado")
                ManagerServices1(crear[1],base)
            }
        }else{

            //Realizamos búsqueda
            const busqueda = await Mongo.buscarBD(id_recomendacion)

            if (busqueda[0] === false && busqueda[2] !== "") throw new TypeError(`Hubo un error: ${busqueda[2]}`) //Validamos que no sea un error
            console.log( busqueda)
            //Existe
        }
        
    } catch (error) {
        console.log(error.message)
    }
}
const base_correcta = {
    generos: ["xxxx"],
    temas_principales: [],
    autores: [],
    lecturas_previas: [],
    ambientacion: [],
    cantidad_hojas: [2],
    contexto_emocional: []
}
await ManagerServices1("xxx", base_correcta)
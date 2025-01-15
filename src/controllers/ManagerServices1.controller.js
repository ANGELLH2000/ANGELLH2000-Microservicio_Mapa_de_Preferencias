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
        if (id_recomendacion === "xxx") {
            //Crear documento en Base de Datos
            const crear = await Mongo.crear_documento_enBD(Objecto_documento.ObjetoDocumento)

            if (crear[0] === false) {
                throw new TypeError("Hubo un error en la creacion del ObjetoDocumento en la base de datos")
            } else {
                console.log("ObjetoDocumento Creado")
                ManagerServices1(crear[1], base)
            }
        } else {

            //Realizamos búsqueda
            const busqueda = await Mongo.buscarBD(id_recomendacion)

            if (busqueda[0] === false && busqueda[2] !== "") throw new TypeError(`Hubo un error: ${busqueda[2]}`) //Validamos que no sea un error
            if (busqueda[0] === false) throw new TypeError(`No Existe el Id`) //Validamos que no sea un error
            //Existe

            if (!(JSON.stringify(busqueda[2]) === JSON.stringify(Objecto_documento.ObjetoDocumento))) { //Usamos JSON.stringify para pasar todo el objeto a plano y comparar el string
                //Diferente al de BD
                //Actualizar la BD
                const update = await Mongo.actualizar_documento_enBD(id_recomendacion, Objecto_documento.ObjetoDocumento)
                if(update[0]===false){
                    throw new TypeError("Hubo un error en la actualiación del ObjetoDocumento en la base de datos")
                }else{
                    console.log("ObjetoDocumento Actulizado",update[1])
                    ManagerServices1(update[1], base)
                }
            } else {
                //Igual al de BD
                //Reconocer Status General
                
                if(Objecto_documento.ObjetoDocumento.status==='completed'){
                    //Completed
                    return {status:'completed',id_recomendacion,base}
                }else{
                    
                }
                console.log("se termino pero son igaules")
                return "se termino pero son igaules"
            }
            //console.log('nivel1:',busqueda[2].nivel1)
            //console.log('nivel1:',Objecto_documento.ObjetoDocumento.nivel1)
            
        }

    } catch (error) {
        console.log(error.message)
    }
}
const base_correcta = {
    generos: ["xxxx"],
    temas_principales: [1],
    autores: [1],
    lecturas_previas: [1],
    ambientacion: [1],
    cantidad_hojas: [1],
    contexto_emocional: [1]
}
console.log(await ManagerServices1("6788126e7cb24bd0c5f46058", base_correcta))
import { disconnectMongoDB } from "../config/mongoDB_connection.config.js"
import dataValidationService from "../services/dataValidationService.js"
import MongoDB_Manager from "../services/MongoDB/MongoDBManager.js"
import NivelesManager from "../services/NivelesManager.js"
import reconocerStatusService from "../services/reconocerStatusService.js"
//Inicio del Servicio
export default async function ManagerServices1(id_recomendacion, base) {
    try {
        //Validación
        if (!dataValidationService(id_recomendacion, base)[0]) throw new TypeError(`Error en la validación: ${dataValidationService(id_recomendacion, base)[1]}`)
        
        //---Instanciamos a MongoManager()
        const Mongo = new MongoDB_Manager()

        //NO EXISTE ID
        if (id_recomendacion === "xxx") {
            //Crear documento_base en Base de Datos
            const crear_base = await Mongo.crear_documentoBase(base)

            if (crear_base[0] === false) throw new TypeError("Hubo un error en la creacion del ObjetoDocumento en la base de datos")
            console.log("ObjetoDocumento Creado")
            return ManagerServices1(crear_base[1], crear_base[2])

        }
        //Si EXISTE ID
        //Buscar el base_bd
        const base_bd = await Mongo.buscar_documentoBase(id_recomendacion)  //[true , id, Objeto]
        if (base_bd[0] === false && base_bd[2] !== "") throw new TypeError(`Hubo un error No existe el documento: ${base_bd[2]}`) //Validamos que exista
        if (base_bd[0] === false) throw new TypeError(`No Existe el Id`) //Validamos que no sea un error

        //Comparar base_bd con base_proporcionada

        ///Es Diferente base_bd con base_proporcionada
        if (JSON.stringify(base) !== JSON.stringify(base_bd[2])) {
            //Actulizamos BD base_bd
            const update = await Mongo.actualizar_documentoBase(id_recomendacion, base)
            if (update[0] === false) throw new TypeError(`Hubo un error en la actualiación del documentoBase.\nID: ${id_recomendacion}\nBase: ${base}`)
            return ManagerServices1(id_recomendacion, base)
        }

        ///Es Igual base_bd con base_proporcionada

        //Creamos Objeto_niveles con Clase
        //---Instanciamos a NivelesManager()
        const Objeto_niveles = new NivelesManager(base, id_recomendacion)

        //Consultamos si EXISTE o NO EXISTE  el documento_Niveles con el id_recomendacion
        const Objeto_niveles_bd = await Mongo.buscar_documentoNiveles(id_recomendacion)
        if (Objeto_niveles_bd[0] === false && Objeto_niveles_bd[2] !== "") throw new TypeError(`Ocurrio un Erro al buscar el documento_niveles`) //Validamos que no sea un error
        if (Objeto_niveles_bd[0] === false && Objeto_niveles_bd[2] === "") {
            //No Existe Objeto_niveles_bd
            ///Crear documento_niveles en Base de Datos
            //console.log(Objeto_niveles.Objeto)
            const crear_niveles = await Mongo.crear_documento_Niveles(Objeto_niveles.Objeto)
            if (crear_niveles[0] === false) throw new TypeError("Hubo un error en la creacion del ObjetoNiveles en la base de datos")
            console.log("ObjetoNiveles Creado")
            return ManagerServices1(id_recomendacion, base)

        }
        // Existe Objeto_niveles_bd

        //Comparar Objeto_niveles_bd con Objeto_niveles

        ///Es Diferente Objeto_niveles_bd con Objeto_niveles
        if (JSON.stringify(Objeto_niveles.Objeto) !== JSON.stringify(Objeto_niveles_bd[2])) {
            //Actulizamos BD Objeto_niveles
            const update_niveles = await Mongo.actualizar_documentoNiveles(id_recomendacion, Objeto_niveles.Objeto)
            if (update_niveles[0] === false) throw new TypeError(`Hubo un error en la actualiación del documentoNiveles.\nID: ${id_recomendacion}\nNivel: ${Objeto_niveles.Objeto}`)
            return ManagerServices1(id_recomendacion, base)
        }

        ///Es Igual Objeto_niveles_bd con Objeto_niveles

        //Reconocer Status General
        /// Status General = 'completed'
        if (Objeto_niveles.Objeto.status === 'completed') {
            return { status: 'completed', id_recomendacion, base }
        }
        //Validando error posible
        if(Objeto_niveles.Objeto.status !== 'incompleted') throw new TypeError("El valor del Status General no corresponde al esperado. Posible inserción en BD")
        
        //  Status General = 'incompleted'
        for (const name_nivel in Objeto_niveles.niveles_incompleted) {
            //console.log(name_nivel)
            const evaluacion =reconocerStatusService(Objeto_niveles.Objeto,name_nivel)
            //error
            if(evaluacion[4]===true)throw new TypeError("Hubo un error con el valor de la propiedad.Posible inserción en BD")
            //Propiedad = 'incompleted'
            if(evaluacion[0]===false){
                return {status:evaluacion[3],id_recomendacion,nivel:evaluacion[1],propiedad:evaluacion[2],base}
            }
        }
        ///No hay necesida pero por sea caso
        return { status: 'completed', id_recomendacion, base }

    } catch (error) {
        throw error
    }
}
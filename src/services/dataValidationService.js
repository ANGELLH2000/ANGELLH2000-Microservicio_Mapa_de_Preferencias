import { name_base_config} from "../config/variables.config.js"
/**
 * Validación de id_recomendacion y base.
 *
 * @module dataValidationService
 * @param {string} id_recomendacion - Identificador único de la recomendación. Debe ser un string de 24 caracteres o el valor 'xxx'.
 * @param {object} base - Objeto base que se debe validar contra la configuración.
 * @returns {boolean} Retorna `true` si la validación es exitosa, o `false` si ocurre un error.
 */
export default function dataValidationService(id_recomendacion, base) {
    try {
        //Validar id_recomendacion
        if (typeof id_recomendacion !== 'string') throw new TypeError("El id debe ser un String")
        if (id_recomendacion !== 'xxx' && id_recomendacion.length !== 24) throw new TypeError ("Para crear un documento en la base de datos debe pasar un id xxx")
        
        //Validar base
        if(typeof base !=='object')throw new TypeError("La base debe ser un Object")
        if(Object.keys(base).toString()!== name_base_config.toString())throw new TypeError("No coinciden las propiedades de la base")
    
        return true


    } catch (error) {
        console.log(error.message)
        return (false)
    }

}
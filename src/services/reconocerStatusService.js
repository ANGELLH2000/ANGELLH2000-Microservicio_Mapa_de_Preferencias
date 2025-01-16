/**
 * Reconocimiento de el vaor de las propiedades del objeto, segun el nivel proporcionado
 *
 * @module reconocerStatusService
 * @param {string} objeto_niveles - Objeto que se va a evaluar
 * @param {object} nivel - Nivel que se va a evaaluar en el objeto
 *             
 * @returns {Array} Si encuentra una propiedad incompleta,
 * 
 * [ `false` , nivel, propiedad , 'incompleted', `false` ]                  
 * @returns {Array} Si encuentra un valor diferente a 'incompleted' o 'completed'. Se considera un Error.
 * 
 * [ `false` , nivel, propiedad , 'xxx', `true`]    
 * @returns {Array} Si no encuentra una propiedad incompleta y ningun error. 
 * 
 * [ `true`, nivel, '' , 'completed', `false` ]                  
 */
export default function reconocerStatusService(objeto_niveles, nivel) {
    for (const propiedad in objeto_niveles[nivel]) {
        //Recorriendo nivelx {generos,tema}
        if (propiedad !== 'status') {
            if (objeto_niveles[nivel][propiedad] === 'incompleted') {
                return [false, nivel, propiedad, 'incompleted', false]
            }
            if (objeto_niveles[nivel][propiedad] !== 'completed') {
                return [false, nivel, propiedad, objeto_niveles[nivel][propiedad], true]
            }
        }
    }
    return [true, nivel, '', 'completed', false]
}
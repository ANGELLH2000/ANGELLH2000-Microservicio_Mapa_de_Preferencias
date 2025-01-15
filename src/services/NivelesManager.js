/**
 * Clase NivelesManager para gestionar los niveles y estados de servicios.
 * Esta clase maneja estados y niveles de configuraciones basadas en un objeto de configuración.
 */

import { base_config, name_niveles_config } from "../config/variables.config.js";


class NivelesManager {
    constructor(base) {
        // Configuración inicial de los niveles y sus estados.

        this.ObjetoDocumento = {
            status: "completed"

        }
        //Se crea el ObjetoDocumento a partir de la base
        name_niveles_config.forEach(name_nivel => {
            this.ObjetoDocumento[name_nivel] = { status: "completed" }
            Object.values(base_config[name_nivel]).forEach((propiedad) => {
                if (base[propiedad].length === 0) {
                    //ObjetoDocumento.nivel1.generos={}
                    this.ObjetoDocumento[name_nivel][propiedad] = { service_status: "not started" }
                    this.ObjetoDocumento[name_nivel].status = "incompleted"
                    this.ObjetoDocumento.status = "incompleted"
                } else {
                    this.ObjetoDocumento[name_nivel][propiedad] = { service_status: "completed" }
                }
            })

        });
    }

}
// Exportando la clase NivelesManager para su uso en otros módulos
export default NivelesManager;
// const Base = {
//     generos: ["xxxx"],
//     temas_principales: [],
//     autores: [],
//     lecturas_previas: [],
//     ambientacion: [],
//     cantidad_hojas: [],
//     contexto_emocional: []
// }
// const l = new NivelesManager(Base)
// console.log(l.ObjetoDocumento)


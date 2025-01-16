/**
 * Clase NivelesManager para gestionar los niveles y estados de servicios.
 * Esta clase maneja estados y niveles de configuraciones basadas en un objeto de configuración.
 */

import { base_config, name_niveles_config } from "../config/variables.config.js";


class NivelesManager {
    constructor(base,id_recomendacion) {
        // Configuración inicial de los niveles y sus estados.

        this.Objeto = {
            id_recomendacion,
            status: "completed"

        }
        this.niveles_incompleted = {}
        //Se crea el Objeto a partir de la base
        name_niveles_config.forEach(name_nivel => {
            this.Objeto[name_nivel] = { status: "completed" }
            Object.values(base_config[name_nivel]).forEach((propiedad) => {
                if (base[propiedad].length === 0) {
                    //Objeto.nivel1.generos={}
                    this.Objeto[name_nivel][propiedad] = "incompleted" 
                    this.Objeto[name_nivel].status = "incompleted"
                    this.niveles_incompleted[name_nivel] = true
                    this.Objeto.status = "incompleted"
                } else {
                    this.Objeto[name_nivel][propiedad] = "completed"
                }
            })

        });

    }

}
export default NivelesManager;



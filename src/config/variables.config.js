
//// Recordatorio
////  Si se va acambiar la base config , asegurate de cambiar el model de mongoose
const base_config = {
    nivel1: ['generos', 'temas_principales'],
    nivel2: ['autores', 'lecturas_previas', 'ambientacion'],
    nivel3: ['cantidad_hojas', 'contexto_emocional']
}
// name_base_config=['generos','temas_principales','autores',etc]
const name_base_config = [];
Object.values(base_config).forEach(element => {
    element.forEach(prop => {
        name_base_config.push(prop)
    })
});
// name_base_config=['nivel1','nivel2','nivel3']
const name_niveles_config = Object.keys(base_config)

export { name_base_config, name_niveles_config ,base_config}
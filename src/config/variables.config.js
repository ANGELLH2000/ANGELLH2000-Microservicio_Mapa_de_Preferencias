const base_config = {
    nivel1: ['generos', 'temas_principales'],
    nivel2: ['autores', 'lecturas_previas', 'ambientacion'],
    nivel3: ['cantidad_hojas', 'contexto_emocional']
}
const name_base_config = [];
Object.values(base_config).forEach(element => {
    element.forEach(prop => {
        name_base_config.push(prop)
    })
});
const name_niveles_config = Object.keys(base_config)

export { name_base_config, name_niveles_config }
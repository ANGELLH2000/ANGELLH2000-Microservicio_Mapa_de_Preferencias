
# Documentación de `MongoDB_Manager()`

## Descripción General
`MongoDB_Manager` es una clase que gestiona las operaciones en la base de datos para documentos de modelos base y niveles. Proporciona métodos para buscar, crear y actualizar documentos en la base de datos.

## Métodos

### `crear_documentoBase(objecto)`
Crea un nuevo documento base en la base de datos.

- **Parámetros:**
  - `objecto` (Object): Datos del nuevo documento.

- **Retorna:**
  - `[true, id, Objeto_documento]` si se crea con éxito.
  - `[false]` en caso de error.

---

### `buscar_documentoBase(id)`
Busca un documento base por su ID.

- **Parámetros:**
  - `id` (string): ID del documento a buscar.

- **Retorna:**
  - `[true, id, Objeto_documento]` si se encuentra.
  - `[false, id, "", false]` si no se encuentra.
  - `[false, id, error.message, false]` si ocurre un error.

---

### `actualizar_documentoBase(id, object)`
Actualiza un documento base existente.

- **Parámetros:**
  - `id` (string): ID del documento a actualizar.
  - `object` (Object): Nuevos valores para el documento.

- **Retorna:**
  - `[true, id, Objeto_documento]` si la actualización es exitosa.
  - `[false, id, object, error.message]` en caso de error.

---

### `crear_documento_Niveles(objecto)`
Crea un nuevo documento de niveles en la base de datos.

- **Parámetros:**
  - `objecto` (Object): Datos del nuevo documento.

- **Retorna:**
  - `[true, id_recomendacion, Objeto_documento]` si se crea con éxito.
  - `[false]` en caso de error.

---

### `buscar_documentoNiveles(id)`
Busca un documento de niveles por su `id_recomendacion`.

- **Parámetros:**
  - `id` (string): ID del documento a buscar.

- **Retorna:**
  - `[true, id_recomendacion, Objeto_documento]` si se encuentra.
  - `[false, id, "", false]` si no se encuentra.
  - `[false, id, error.message, false]` si ocurre un error.

---

### `actualizar_documentoNiveles(id, object)`
Actualiza un documento de niveles existente.

- **Parámetros:**
  - `id` (string): ID del documento a actualizar.
  - `object` (Object): Nuevos valores para el documento.

- **Retorna:**
  - `[true, id, Objeto_documento]` si la actualización es exitosa.
  - `[false, id, object, error.message]` en caso de error.

## Ejemplo de Uso

```javascript
import MongoDB_Manager from './path/to/MongoDB_Manager';

const manager = new MongoDB_Manager();

// Crear un documento base
const resultadoBase = await manager.crear_documentoBase({ propiedad1: 'valor1', propiedad2: 'valor2' });
console.log(resultadoBase);

// Buscar un documento de niveles
const resultadoNiveles = await manager.buscar_documentoNiveles('123456789012345678901234');
console.log(resultadoNiveles);

// Actualizar un documento base
const actualizacionBase = await manager.actualizar_documentoBase('123456789012345678901234', { propiedad1: 'nuevo valor' });
console.log(actualizacionBase);
```

## Notas
- La clase depende de los modelos `baseModel` y `nivelModel`.
- Las configuraciones `name_base_config` y `name_niveles_config` deben estar correctamente definidas.

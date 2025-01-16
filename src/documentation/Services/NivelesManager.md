
# Documentación de `NivelesManager()`

## Descripción General
`NivelesManager` es una clase diseñada para gestionar los niveles y estados de servicios. Crea y organiza los niveles con base en una configuración predefinida y el estado de los datos proporcionados.

## Parámetros del Constructor

- `base` (object): Objeto que contiene los datos base necesarios para construir los niveles.
- `id_recomendacion` (string): Identificador único asociado a la recomendación.

## Propiedades de la Clase

- `Objeto` (object): Contiene los niveles y su estado, con la siguiente estructura:
  - `id_recomendacion`: El identificador único de la recomendación.
  - `status`: Estado general del objeto (`"completed"` o `"incompleted"`).
  - Por cada nivel definido en `name_niveles_config`:
    - `status`: Estado del nivel (`"completed"` o `"incompleted"`).
    - Propiedades dentro del nivel: Estado de cada propiedad (`"completed"` o `"incompleted"`).

- `niveles_incompleted` (object): Contiene los niveles que tienen al menos una propiedad con estado `"incompleted"`.

## Proceso Interno del Constructor

1. **Inicialización del Objeto**:
   - Se define el objeto `Objeto` con el `id_recomendacion` y un estado inicial de `"completed"`.

2. **Construcción de los Niveles**:
   - Para cada nivel definido en `name_niveles_config`:
     - Se inicializa con un estado de `"completed"`.
     - Se evalúan las propiedades del nivel basándose en `base_config`:
       - Si una propiedad tiene longitud 0 en `base`, su estado se define como `"incompleted"`.
       - Si todas las propiedades están completas, el estado permanece como `"completed"`.
     - Si alguna propiedad está incompleta, el estado del nivel y del objeto se actualizan a `"incompleted"`.

3. **Registro de Niveles Incompletos**:
   - Los niveles con propiedades incompletas se agregan al objeto `niveles_incompleted`.

## Ejemplo de Uso

```javascript
import NivelesManager from './path/to/NivelesManager';

// Configuración simulada
const base = {
    generos: [],
    tema: ['tema1'],
    autor: []
};

const id_recomendacion = '123456789012345678901234';

// Crear una instancia de NivelesManager
const manager = new NivelesManager(base, id_recomendacion);

console.log(manager.Objeto);
// Salida:
// {
//     id_recomendacion: '123456789012345678901234',
//     status: 'incompleted',
//     nivel1: { generos: 'incompleted', status: 'incompleted' },
//     nivel2: { tema: 'completed', status: 'completed' },
//     nivel3: { autor: 'incompleted', status: 'incompleted' }
// }

console.log(manager.niveles_incompleted);
// Salida: { nivel1: true, nivel3: true }
```

## Notas
- La clase depende de las configuraciones `base_config` y `name_niveles_config`, las cuales deben estar correctamente definidas para que funcione correctamente.

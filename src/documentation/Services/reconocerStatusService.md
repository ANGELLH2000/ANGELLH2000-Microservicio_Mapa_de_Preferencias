
# Documentación de `reconocerStatusService()`

## Descripción General
`reconocerStatusService` es una función que evalúa las propiedades de un objeto en un nivel específico y determina su estado. La función identifica si existen propiedades incompletas, valores erróneos o si todas las propiedades están completadas.

## Parámetros

- `objeto_niveles` (Object): El objeto que contiene los niveles a evaluar.
- `nivel` (string): El nivel dentro del objeto que se evaluará.

## Retornos

### Caso 1: Propiedad incompleta
Si encuentra una propiedad cuyo valor es `'incompleted'`:
- Retorna: `[false, nivel, propiedad, 'incompleted', false]`

### Caso 2: Valor inválido
Si encuentra una propiedad con un valor diferente a `'incompleted'` o `'completed'`, lo considera un error:
- Retorna: `[false, nivel, propiedad, valor, true]`

### Caso 3: Todas las propiedades completadas
Si todas las propiedades tienen el valor `'completed'`:
- Retorna: `[true, nivel, '', 'completed', false]`

## Proceso Interno

1. **Recorrido de las Propiedades**:
   - Itera sobre las propiedades del nivel especificado en `objeto_niveles`.
   - Excluye la propiedad `'status'` de la evaluación.

2. **Evaluación del Estado**:
   - Si el valor de una propiedad es `'incompleted'`, se detiene y retorna el estado correspondiente.
   - Si el valor de una propiedad no es `'completed'` ni `'incompleted'`, lo considera un error y retorna el estado correspondiente.

3. **Retorno del Resultado**:
   - Si no encuentra propiedades incompletas ni errores, retorna que el nivel está completado.

## Ejemplo de Uso

```javascript
import reconocerStatusService from './path/to/reconocerStatusService';

// Definir el objeto de niveles
const objetoNiveles = {
    nivel1: {
        generos: 'completed',
        tema: 'incompleted',
        status: 'pending'
    },
    nivel2: {
        generos: 'completed',
        tema: 'completed',
        status: 'completed'
    }
};

// Evaluar un nivel
const resultado = reconocerStatusService(objetoNiveles, 'nivel1');
console.log(resultado);
// Salida: [false, 'nivel1', 'tema', 'incompleted', false]

const resultado2 = reconocerStatusService(objetoNiveles, 'nivel2');
console.log(resultado2);
// Salida: [true, 'nivel2', '', 'completed', false]
```

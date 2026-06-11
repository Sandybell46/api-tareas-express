# API de tareas con Express.js

API RESTful basica desarrollada con Node.js y Express. Permite listar, buscar,
crear, actualizar y eliminar tareas almacenadas en un arreglo de objetos.

Cada tarea contiene:

- `id`: identificador numerico unico.
- `titulo`: titulo de la tarea.
- `descripcion`: detalle de la tarea.
- `completada`: estado booleano (`true` o `false`).

## Instalacion y ejecucion

Requisitos: tener Node.js instalado.

```bash
npm install
npm start
```

El servidor estara disponible en `http://localhost:3000`.

## Estructura del proyecto

```text
api-tareas/
|-- data.js       # Arreglo de tareas
|-- index.js      # Configuracion y arranque del servidor
|-- routes.js     # Rutas, validaciones y operaciones CRUD
|-- package.json  # Dependencias y scripts
`-- README.md     # Documentacion
```

## Flujo de la aplicacion

1. `index.js` configura Express para recibir JSON.
2. Las peticiones a `/tareas` son enviadas a `routes.js`.
3. `routes.js` valida los datos y modifica el arreglo exportado por `data.js`.
4. La API responde siempre en formato JSON y con el codigo HTTP apropiado.

## Decisiones de diseño

- Los datos se guardan en memoria mediante `data.js`, segun la pauta. Al
  reiniciar el servidor se restauran los datos iniciales.
- Los nuevos IDs se calculan usando el ID mayor mas uno para evitar duplicados
  despues de eliminar tareas.
- `PUT` permite modificar uno o mas campos de una tarea existente.
- Las respuestas usan `400` para datos inválidos, `404` para recursos
  inexistentes, `200` para operaciones exitosas y `201` al crear.

## Endpoints

| Metodo | Ruta | Descripcion |
|---|---|---|
| GET | `/tareas` | Lista todas las tareas |
| GET | `/tareas/:id` | Busca una tarea por ID |
| POST | `/tareas` | Crea una tarea |
| PUT | `/tareas/:id` | Actualiza una tarea |
| DELETE | `/tareas/:id` | Elimina una tarea |

## Pruebas y ejemplos

Con el servidor ejecutandose, se pueden realizar estas pruebas en Postman o en
otra terminal.

### GET: listar tareas

Peticion:

```bash
curl http://localhost:3000/tareas
```

Ejemplo de respuesta `200`:

```json
[
  {
    "id": 1,
    "titulo": "Estudiar Express",
    "descripcion": "Repasar rutas y metodos HTTP",
    "completada": false
  }
]
```

### POST: crear una tarea

Peticion:

```bash
curl -X POST http://localhost:3000/tareas -H "Content-Type: application/json" -d "{\"titulo\":\"Preparar entrega\",\"descripcion\":\"Completar README\",\"completada\":false}"
```

Ejemplo de respuesta `201`:

```json
{
  "id": 3,
  "titulo": "Preparar entrega",
  "descripcion": "Completar README",
  "completada": false
}
```

### PUT: actualizar una tarea

Peticion:

```bash
curl -X PUT http://localhost:3000/tareas/3 -H "Content-Type: application/json" -d "{\"completada\":true}"
```

Ejemplo de respuesta `200`:

```json
{
  "id": 3,
  "titulo": "Preparar entrega",
  "descripcion": "Completar README",
  "completada": true
}
```

### DELETE: eliminar una tarea

Peticion:

```bash
curl -X DELETE http://localhost:3000/tareas/3
```

Ejemplo de respuesta `200`:

```json
{
  "mensaje": "Tarea eliminada correctamente",
  "tarea": {
    "id": 3,
    "titulo": "Preparar entrega",
    "descripcion": "Completar README",
    "completada": true
  }
}
```

### Ejemplos de errores

Si faltan campos obligatorios o un tipo de dato es incorrecto:

```json
{
  "error": "El campo 'descripcion' es obligatorio"
}
```

La API responde con codigo `400`.

Si una tarea no existe:

```json
{
  "error": "Tarea no encontrada"
}
```

La API responde con codigo `404`.

## Pantallazos de pruebas

Antes de entregar, agregar aqui pantallazos de Postman mostrando:

1. GET `/tareas`.
2. POST `/tareas`.
3. PUT `/tareas/:id`.
4. DELETE `/tareas/:id`.
5. Una validación con respuesta `400`.
6. Una búsqueda inexistente con respuesta `404`.

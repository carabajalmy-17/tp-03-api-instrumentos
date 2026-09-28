# Trabajo práctico 03

## Descripción

API HTTP desarrollada con Node.js y Express para administrar temporalmente un catálogo de instrumentos musicales.
La aplicación permite listar instrumentos, filtrarlos por familia, consultar un instrumento por su identificador y agregar nuevos instrumentos temporalmente en memoria.

## Instalación

Para instalar las dependencias del proyecto ejecutar: npm install

## Ejecución

Para iniciar el servidor ejecutar: npm start
El servidor estará disponible en: http://localhost:3000
Para detener el servidor se debe presionar Ctrl + C en la terminal.

### Bienvenida
GET / Devuelve un mensaje indicando que la API está disponible.

### Listar instrumentos

GET /api/instrumentos
Devuelve todos los instrumentos disponibles en el catálogo.

### Filtrar instrumentos por familia

GET /api/instrumentos?familia=cuerda
Permite filtrar los instrumentos según su familia. La comparación no distingue entre mayúsculas y minúsculas.
Si no existen instrumentos de la familia indicada, se devuelve un arreglo vacío.

### Obtener instrumento por ID

GET /api/instrumentos/:id
Busca un instrumento mediante su identificador.
Si el instrumento existe, se devuelve el instrumento encontrado. Si no existe, se devuelve un error con estado 404.

### Crear un instrumento

POST /api/instrumentos
Permite agregar un nuevo instrumento temporalmente al catálogo.
El cuerpo de la solicitud debe contener:

- nombre
- familia
- origen
- descripcion
- disponible

## Ejemplos de solicitudes

Ejemplo de creación de un instrumento:
POST /api/instrumentos

{
  "nombre": "Charango",
  "familia": "Cuerda",
  "origen": "Región andina",
  "descripcion": "Instrumento pequeño de cuerda utilizado en la música tradicional andina.",
  "disponible": false
}

## Códigos de estado

- 200 OK: la solicitud GET se realizó correctamente.
- 201 Created: el instrumento fue creado correctamente.
- 400 Bad Request: falta uno o más campos obligatorios en la creación.
- 404 Not Found: no se encontró un instrumento con el ID solicitado.

## Persistencia de los datos

Los instrumentos creados mediante POST se almacenan únicamente en memoria mientras el servidor está en ejecución.
La aplicación no modifica el archivo datos/instrumentos.json.
Por este motivo, al detener y volver a iniciar el servidor, los instrumentos creados mediante POST desaparecen y se vuelven a cargar los datos originales desde instrumentos.json.
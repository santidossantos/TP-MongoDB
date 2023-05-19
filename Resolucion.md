# Bases de Datos II

**Bases de Datos NoSQL / Práctica con MongoDB**

---

### Parte 1

### 1. ¿Cuáles de los siguientes conceptos de RDBMS existen en MongoDB?
En caso de no existir, ¿hay alguna alternativa? ¿Cuál es?

- `Base de Datos:` tanto en los RDBMS como en MongoDB, este concepto es el mismo.

- `Tabla / Relación`: en lugar de tablas, en MongoDB se utilizan colecciones. Una colección en MongoDB es similar a una tabla en un RDBMS, ya que almacena un conjunto de documentos. Sin embargo, a diferencia de las tablas, las colecciones no tienen un esquema fijo, lo que significa que los documentos dentro de una colección pueden tener estructuras diferentes.

- `Fila / Tupla:` En MongoDB, los documentos individuales se corresponden con las filas o tuplas en un RDBMS. Cada documento es una entidad independiente que contiene campos y valores.

- `Columna:` en MongoDB, los campos dentro de un documento son similares a las columnas en un RDBMS. Cada documento puede tener múltiples campos que almacenan diferentes tipos de datos.

- `Clave Primaria:` MongoDB asigna automáticamente un identificador único a cada documento llamado "_id". Esta es una clave primaria implícita para cada documento y es única dentro de una colección. Sin embargo, a diferencia de las claves primarias en un RDBMS, no hay restricciones de integridad referencial asociadas con la clave primaria en MongoDB.

- `Clave Foránea:` MongoDB no tiene un concepto directo de claves foráneas como los RDBMS. En su lugar, la relación entre documentos en diferentes colecciones se establece utilizando referencias. Puedes almacenar el "_id" de un documento de una colección en otro documento como un campo de referencia para establecer una relación entre ellos.

---

### 2. MongoDB tiene soporte para transacciones, pero no es igual que el de los RDBMS.

El alcance de una transacción en MongoDB se limita a los documentos que pertenecen a una única base de datos. Esto significa que las operaciones de una transacción deben afectar a documentos dentro de la misma base de datos, pero no necesariamente a todos los documentos de esa base de datos. 

---

### 3. Para acelerar las consultas, MongoDB tiene soporte para índices. ¿Qué tipos de índices

**Índices de un solo campo:**

- Son los índices más simples y comunes en MongoDB. Se crean sobre un campo de un documento. Estos índices son útiles cuando se realizan consultas basadas en un campo específico.

Supongamos una colección llamada "usuarios" y se quiere indexar el campo "nombre":

```jsx
db.usuarios.createIndex({ nombre: 1 })
```

---

**Índices compuestos:**

- Los índices compuestos se crean en múltiples campos de un documento. Estos índices pueden mejorar el rendimiento de las consultas que involucran múltiples campos y ayudan a acelerar las búsquedas complejas.

Supongamos que se quiere  indexar los campos "nombre" y "edad" en la colección "usuarios":

```jsx
db.usuarios.createIndex({ nombre: 1, edad: -1 })
```

---

**Índices de texto:**

- MongoDB proporciona soporte para la creación de índices de texto que permiten realizar búsquedas de texto completo en campos de tipo cadena de caracteres. Estos índices son útiles cuando se realizan consultas que involucran palabras clave o frases.

Supongamos una colección llamada "posts" y se desea realizar una búsqueda de texto completo en el campo "contenido":

```jsx
db.posts.createIndex({ contenido: "text" })
```

---

**Índices geoespaciales:**

- MongoDB tiene soporte para la indexación de datos geoespaciales. Los índices geoespaciales permiten realizar consultas espaciales y optimizan las operaciones que involucran coordenadas geográficas.
    
    

Supongamos una colección llamada "tiendas" y se quiere indexar las coordenadas geográficas en el campo "ubicacion":

```jsx
db.tiendas.createIndex({ ubicacion: "2dsphere" })
```

---

**Índices hash:**

- Los índices hash en MongoDB son útiles para mejorar el rendimiento de las consultas de igualdad en campos de alta cardinalidad. Estos índices se utilizan cuando se busca una coincidencia exacta en un campo determinado.

Supongamos una colección llamada "productos" y se quiere indexar el campo "código":

```jsx
db.productos.createIndex({ codigo: "hashed" })
```

**Índices TTL (Time-To-Live):**

- Los índices TTL en MongoDB permiten definir una expiración automática de documentos después de un tiempo determinado.

Supongamos una colección llamada "sesiones" y se quiere que los documentos se eliminen automáticamente después de “fechaExpiracion":

```jsx
db.sesiones.createIndex({ fechaExpiracion: 1 }, { expireAfterSeconds: 3600 })
```

---

### 4. ¿Existen claves foráneas en MongoDB?

- No existen claves foraneas como tales, pero si es posible almacenar el Object Id de otro documento para establecer una referencia. Es decir, de alguna manera simular el funcionamiento de una clave foránea.

---

## Parte 2

### 5.

Crear la Base de Datos:

```jsx
use ecommerce
```

Crear la Coleccion:

```jsx
db.createCollection("products")
```

Insertar Producto:

```jsx
db.products.insertOne( { name: "Yerba Paysandu", price: 600 } )
```

Mostrar Documentos de la Coleccion:

```jsx
db.products.find().pretty()
```

### 6. Agregue los siguientes documentos a la colección de productos:

Para insertar multiples documentos utilizamos:

```jsx
db.products.insertMany( [
      { name: "Fideos Marolio t", price: 450, tags: ["tallarines", "500"] },
      { name: "Fideos Marolio ftcni", price: 630, tags: ["fetuccinni", "500"] },
      { name: "Fideos OneWay", price: 450 },
			{ name: "Fideos Familia Unita lanzamiento", price: 800, tags: ["tallarines", "500", "alhuevo"] }
]);
```

### Consultas

Productos que valen  $750 o menos:

```jsx
db.products.find({ price: { $lte: 750 } })
```

Productos que tengan la etiqueta (*tag*) “tallarines”:

```jsx
db.products.find({ tags: "tallarines" })
```

Productos que no tengan etiquetas (es decir, que el atributo esté ausente):

```jsx
db.products.find({ tags: { $exists: false } })
```

Que incluyan la palabra ‘Marolio’ en su nombre:

```jsx
db.products.find({ name: { $regex: "Marolio" } })
```

Con la palabra ‘Marolio’ en su nombre y con un precio mayor de $500

```jsx
db.products.find({ name: { $regex: "Marolio" }, price: { $gt: 500 } })
```

Vuelva a realizar la última consulta pero proyecte sólo el nombre del producto en los
resultados, omitiendo incluso el atributo ‘**_id’** de la proyección

```jsx
db.products.find({ name: { $regex: "Marolio" }, price: { $gt: 500 } }, { _id: 0, name: 1 })
```

---

### 7.
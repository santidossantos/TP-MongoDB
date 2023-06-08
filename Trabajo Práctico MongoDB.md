# Trabajo Práctico MongoDB

---

## Parte I

### 1. ¿Cuáles de los siguientes conceptos de RDBMS existen en MongoDB?
En caso de no existir, ¿hay alguna alternativa? ¿Cuál es?

- **Base de Datos:** tanto en los RDBMS como en MongoDB, el concepto es el mismo.

- **Tabla / Relación:** en lugar de tablas, en MongoDB se utilizan colecciones. Una colección en MongoDB es similar a una tabla en un RDBMS, ya que almacena un conjunto de documentos. Sin embargo, a diferencia de las tablas, las colecciones no tienen un esquema fijo, lo que significa que los documentos dentro de una colección pueden tener estructuras diferentes.

- **Fila / Tupla:** en MongoDB, los documentos individuales se corresponden con las filas o tuplas en un RDBMS. Cada documento es una entidad independiente que contiene campos y valores.

- **Columna:** los campos dentro de un documento son similares a las columnas en un RDBMS. Cada documento puede tener múltiples campos que almacenan diferentes tipos de datos. Pueden existir documentos de una misma coleccion que posean una estructura diferente.

- **Clave Primaria:** MongoDB asigna automáticamente un identificador (id) a cada documento.  Esta es una clave primaria implícita para cada documento y es única dentro de una colección. Sin embargo, a diferencia de las claves primarias en un RDBMS, no hay restricciones de integridad referencial asociadas con la clave primaria en MongoDB.

- **Clave Foránea:** MongoDB no tiene un concepto directo de claves foráneas como los RDBMS. En su lugar, la relación entre documentos en diferentes colecciones se establece utilizando referencias. Es posible almacenar el "id" de un documento de una colección en otro documento como un campo de referencia para establecer una relación entre ellos.

---

### 2. MongoDB tiene soporte para transacciones, pero no es igual que el de los RDBMS.

El alcance de una transacción en MongoDB se limita a los documentos que pertenecen a una única base de datos. Esto significa que las operaciones de una transacción deben afectar a documentos dentro de la misma base de datos, pero no necesariamente a todos los documentos de esa base de datos.  En otras palabras, las transacciones se realizan a nivel de documentos.

---

### 3. Para acelerar las consultas, MongoDB tiene soporte para índices. ¿Qué tipos de índices

**Índices de un solo campo:**

- Son los índices más simples y comunes en MongoDB. Se crean sobre un campo de un documento. Estos índices son útiles cuando se realizan consultas basadas en un campo específico.

- Supongamos una colección llamada "usuarios" y se quiere indexar el campo "nombre":
    
    ```jsx
    db.usuarios.createIndex({ nombre: 1 })
    ```
    

---

**Índices compuestos:**

- Los índices compuestos se crean en múltiples campos de un documento. Estos índices pueden mejorar el rendimiento de las consultas que involucran múltiples campos y ayudan a acelerar las búsquedas complejas.

- Supongamos el siguiente ejemplo: se quiere  indexar los campos "nombre" y "fechaNacimiento" en la colección "usuarios":
    
    ```jsx
    db.usuarios.createIndex({ nombre: 1, fechaNacimiento: -1 })
    // Utilizamos 1 o -1 para especificar orden ascendente o descendente.
    ```
    

---

**Índices de texto:**

- MongoDB proporciona soporte para la creación de índices de texto que permiten realizar búsquedas de texto completo en campos de tipo cadena de caracteres. Estos índices son útiles cuando se realizan consultas que involucran palabras clave o frases.

- Supongamos el siguiente ejemplo: dada una colección llamada "posts", se desea realizar una búsqueda de texto completo en el campo "contenido":
    
    ```jsx
    db.posts.createIndex({ contenido: "text" })
    ```
    

---

**Índices geoespaciales:**

- MongoDB tiene soporte para la indexación de datos geoespaciales. Los índices geoespaciales permiten realizar consultas espaciales y optimizan las operaciones que involucran coordenadas geográficas.
    
    
- Supongamos una colección llamada "tiendas" y se quiere indexar las coordenadas geográficas en el campo "ubicacion":
    
    ```jsx
    db.tiendas.createIndex({ ubicacion: "2dsphere" })
    ```
    

---

**Índices hash:**

- Los índices hash en MongoDB son útiles para mejorar el rendimiento de las consultas de igualdad en campos de alta cardinalidad. Estos índices se utilizan cuando se busca una coincidencia exacta en un campo determinado.

- En el siguiente ejemplo, se tiene una colección llamada "productos" y se quiere indexar el campo "código":
    
    ```jsx
    db.productos.createIndex({ codigo: "hashed" })
    ```
    

---

**Índices TTL (Time-To-Live):**

- Los índices TTL en MongoDB permiten definir una expiración automática de documentos después de un tiempo determinado.

- Supongamos una colección llamada "sesiones" y se quiere que los documentos se eliminen automáticamente después de “fechaExpiracion":
    
    ```jsx
    db.sesiones.createIndex({ fechaExpiracion: 1 }, { expireAfterSeconds: 3600 })
    ```
    

Cabe mencionar que estos son solo alguno de los índices que provee MongoDB. Sin embargo existen algunos otros tipos, como por ejemplo los índices comodín (Wildcard) , índices multiclaves que son muy utilizados para indexar matrices, índices 2D para figuras del plano,  índices geoHaystack, entre otros.

---

### 4. ¿Existen claves foráneas en MongoDB?

No existen claves foraneas como tales, pero si es posible almacenar el Object Id de otro documento para establecer una referencia. Es decir, de alguna manera simular el funcionamiento de una clave foránea.

**Las maneras de referenciar en MongoDB son las siguientes:**

- Por referencias:
    - Referencias manuales: consiste en  alamcenar el campo id de un documento en otro documento como referencia. Su aplicación ejecuta una segunda consulta para devolver los datos relacionados. Estas referencias son simples y suficientes para la mayoría de los casos de uso.
    - DBREFS:  son referencias de un documento a otro utilizando el valor del campo id del primer documento, el nombre de la colección y, opcionalmente, el nombre de su base de datos, así como cualquier otro campo. DBRefs permite hacer referencia más fácilmente a documentos almacenados en múltiples colecciones o bases de datos.

- Por objeto embebido

---

## Parte II

### 5.

Crear la base de datos:

```jsx
use ecommerce
```

Crear la coleccion:

```jsx
db.createCollection("products")
```

Insertar producto:

```jsx
db.products.insertOne({ name: "Yerba Paysandu", price: 600 })
```

Mostrar documentos de la coleccion:

```jsx
db.products.find().pretty()
```

Al recuperar la información, podemos notar que además se generó un campo _id, el cual es construido automáticamente por Mongo para cada documento.

---

### 6. Agregue los siguientes documentos a la colección de productos:

Para insertar múltiples documentos utilizamos:

```jsx
db.products.insertMany([
      { name: "Fideos Marolio t", price: 450, tags: ["tallarines", "500"] },
      { name: "Fideos Marolio ftcni", price: 630, tags: ["fetuccinni", "500"] },
      { name: "Fideos OneWay", price: 450 },
      { name: "Fideos Familia Unita lanzamiento", price: 800, tags: ["tallarines", "500", "alhuevo"] }
]);
```

Productos que valen  $750 o menos:

```jsx
db.products.find({ price: { $lte: 750 }})
```

Productos que tengan la etiqueta (*tag*) “tallarines”:

```jsx
db.products.find({ tags: "tallarines" })
```

Productos que no tengan etiquetas (es decir, que el atributo esté ausente):

```jsx
db.products.find({ tags: { $exists: false }})
```

Que incluyan la palabra ‘Marolio’ en su nombre:

```jsx
db.products.find({ name: { $regex: "Marolio" }})
```

Con la palabra ‘Marolio’ en su nombre y con un precio mayor de $500

```jsx
db.products.find({ name: { $regex: "Marolio" }, price: { $gt: 500 }})
```

Vuelva a realizar la última consulta pero proyecte sólo el nombre del producto en los
resultados, omitiendo incluso el atributo ‘**_id’** de la proyección

```jsx
db.products.find({ name: { $regex: "Marolio" }, price: { $gt: 500 }}, { _id: 0, name: 1 })
```

- Observación
    
    No es necesario poner tags en 0, ya que es el valor por default.
    

---

### 7.  Actualice la ’Fideos Marolio t’ cambiándole el precio a $530

```jsx
db.products.updateOne({ name: { $eq: "Fideos Marolio t"}}, { $set: { price: 530 }})
```

---

### 8. Cree el array de etiquetas (tags) para la “Fideos OneWay”.

```jsx
db.products.updateOne({ name: { $eq: "Fideos OneWay"}}, { $set: { tags: []}})
```

---

### 9. Agregue “tirabuzón” a las etiquetas de la “Fideos OneWay”

```jsx
db.products.updateOne({ name: { $eq: "Fideos OneWay"}}, { $addToSet: { tags : "tirabuzon"}})
```

---

### 10. Incremente en un 10% los precios de todos los tallarines.

```jsx
db.products.updateMany({ tags: "tallarines" }, { $mul: { price: 1.1 } })
```

---

## Parte III

Eliminamos todos los productos de la colección products

```jsx
db.products.deleteMany({});
```

Cargar el archivo generador.js (recordar reemplazar path por la ruta al archivo real).

```jsx
load("/path/generador.js")
```

- Demo
    
    ```jsx
    // Ejemplo concreto
    load ("/Users/santiago/Downloads/generator.js")
    ```
    

- Observación
    
    El script proporcionado usa una manera de insertar deprecada, deberia utilizar insertOne() en lugar de insert()
    

---

### 11. Busque en la colección de compras (purchases) si existe algún índice definido.

```jsx
db.products.getIndexes()
```

```jsx
// Como respuesta obtenemos
[ { v: 2, key: { _id: 1 }, name: '_id_' } ]
```

Esto nos indica que existe un índice de un solo campo y se esta indexando la clave de la colección products.

---

### 12. Busque los las compras que tengan en el nombre del producto el string “11” y utilice el método explain("executionStats") al final de la consulta para ver la **cantidad de documentos examinados** y el **tiempo en milisegundos** de la consulta. Cree un índice adecuado para el campo productName, y realice la misma consulta que realizó con anterioridad. Compare los datos obtenidos.

Obtener las compras que tengan en el nombre del producto el string “11”:

```jsx
db.purchases.find({ productName : { $regex : '11' } }).explain("executionStats")
```

Creación del Índice:

```jsx
db.purchases.createIndex({ productName: 1 })
```

La siguiente tabla compara los tiempos de ejecución y la cantidad de documentos analizados para una ejecución en particular. Su objetivo es contrastar los resultados obtenidos por la consulta mencionada anteriormente, antes de la creación del índice y luego de la creación del mismo.

| Tiempo de Ejecución (ms) |  Sin indexar | Indexado |
| --- | --- | --- |
| Ensayo I | 50 | 52 |
| Ensayo II | 35 | 51 |
| Ensayo III | 33 | 51 |
| Promedio de los tiempos de ejecución | 39.33 | 51.33 |
| Cantidad de documentos examinados en un ensayo | 44679 | 2203 |
| Cantidad de claves (keys) examinadas | 0 | 44679 |
- Observación
    
    Si bien el comportamiento esperado es que al consultar utilizando el índice los tiempos de respuesta deberían reducirse, en este caso no ocurre tal hecho, ya que las pruebas se ejecutaron con una cantidad de registros pequeña y no es posible notar una gran diferencia
    
- Ejemplo de la ejecución sin índice
    
    ```jsx
    executionSuccess: true,
        nReturned: 2203,
        executionTimeMillis: 50,
        totalKeysExamined: 0,
        totalDocsExamined: 44679,
    ```
    
- Ejemplo de la ejecución con índice
    
    ```jsx
    executionSuccess: true,
        nReturned: 2203,
        executionTimeMillis: 52,
        totalKeysExamined: 44679,
        totalDocsExamined: 2203,
    ```
    

---

### 13. Busque las compras enviadas dentro de la ciudad de Buenos Aires. Para esto, puede definir una variable en la terminal y asignarle como valor el polígono del archivo provisto **caba.geojson** (copiando y pegando directamente). Cree un índice geoespacial de tipo **2dsphere** para el campo **location** de la colección **purchases** y, de la misma forma que en el punto 12, compare la performance de la consulta con y sin dicho índice.

Creación del índice geoespacial:

```jsx
db.purchases.createIndex({ location : "2dsphere" })
```

Primero cargamos la variable temporal (que contiene la delimitación del polígono que representa la Ciudad de Buenos Aires) en la consola de Mongo:

```jsx
bsas = {
	 "type":"MultiPolygon",
	 "coordinates":[[[
	   [-58.46305847167969,-34.53456089748654],
	   [-58.49979400634765,-34.54983198845187],
	   [-58.532066345214844,-34.614561581608186],
	   [-58.528633117675774,-34.6538270014492],
	   [-58.48674774169922,-34.68742794931483],
	   [-58.479881286621094,-34.68206400648744],
	   [-58.46855163574218,-34.65297974261105],
	   [-58.465118408203125,-34.64733112904415],
	   [-58.4585952758789,-34.63998735602951],
	   [-58.45344543457032,-34.63603274732642],
	   [-58.447265625,-34.63575026806082],
	   [-58.438339233398445,-34.63038297923296],
	   [-58.38100433349609,-34.62162507826766],
	   [-58.38237762451171,-34.59251960889388],
	   [-58.378944396972656,-34.5843230246475],
	   [-58.46305847167969,-34.53456089748654]
	]]
 ]
}
```

- Extra
    
    Podemos imprimir el valor de la variable temporal bsas utilizando:
    
    ```jsx
    // Opcion 1
    printjson(bsas); 
    // Opcion 2
    print(tojson(bsas));
    ```
    

Obtener las compras enviadas dentro de la ciudad de Buenos Aires:

```jsx
db.purchases.find({ location : { $geoWithin : { $geometry : bsas } }})
```

| Tiempo de Ejecución (ms) |  Sin indexar | Indexado |
| --- | --- | --- |
| Ensayo I | 76 | 46 |
| Ensayo II | 75 | 42 |
| Ensayo III | 76 | 42 |
| Promedio de los tiempos de ejecución | 76.66 | 44.66 |
| Cantidad de documentos examinados en un ensayo | 44679 | 11655 |
| Cantidad de claves (keys) examinadas | 0 | 11655 |

En esta comparación, podemos notar claramente la ventaja de utilizar un índice geoespacial con respecto a los tiempos de ejecución y la cantidad de documentos examinados. Al igual que en el ejercicio anterior, se hizo uso de el método explain("executionStats") para obtener la información de cada ensayo.

---

## Parte IV

### 14. Usando el framework de agregación, obtenga 5 productos aleatorios de la colección.

```jsx
db.products.aggregate([{ $sample: { size: 5 } }])
```

Se usa el operador $sample para obtener una muestra aleatoria de 5 documentos de la colección products. El resultado va a ser una lista con 5 productos seleccionados al azar.

---

### 15. Usando el framework de agregación, obtenga las compras que se hayan entregado a 1km (o menos) del centro de la ciudad de Buenos Aires ([-58.4586,-34.5968]) y guárdelas en una nueva colección.

Utilizamos el índice geoespacial en la colección purchases, creado anteriormente en el ejercicio 13, ya que es necesario para utilizar la operación $geoNear.

```jsx
db.purchases.createIndex({ location: "2dsphere" })
```

Si usted ya creó el índice anteriormente, no es neceario volver a ejecutar este código

Se utiliza el operador $geoNear para hacer la búsqueda geoespacial. El campo "coordinates" tiene las coordenadas del centro de la ciudad de Buenos Aires, y la opción "maxDistance" se pone en 1000 metros (1KM) para filtrar las compras que están a esa distancia o menos. 

El operador $out se especifica que los resultados se tienen que guardar en la colección "compras_entregadas”.

```jsx
db.purchases.aggregate([
  {
    $geoNear: {
      near: {
        type: "Point",
        coordinates: [-58.4586, -34.5968]
      },
      distanceField: "distance",
      maxDistance: 1000,
      spherical: true 
    }
  },
  {
    $out: "compras_entregadas"
  }
])
```

Luego de ejecutar esta consulta, podremos ver que se ha creado una nueva colección llamada compras_entregadas. Podemos consultar su contenido con el siguiente comando:

```jsx
db.compras_entregadas.find().pretty()
```

---

### 16. Obtenga una colección de los productos incluidos en las compras obtenidas en la consulta anterior. Note que sólo es posible ligarlas por el nombre del producto. Si la consulta se empieza a tornar difícil de leer, se pueden ir guardando los agregadores en variables, que no son más que objetos en formato JSON.

```jsx
db.compras_entregadas.aggregate([
	 {
    $group: {
      _id: "$productName"
    }
   },
		{
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "name",
      as: "productos"
		}
  },
  {
    $unwind: "$productos"
  },
	 {
    $replaceRoot: {
      newRoot: "$productos"
    }
  },
  {
    $out: "productos_comprados"
  }
]);
```

Podemos corroborar el contenido de la nueva colección, “productos_comprados” haciendo uso del siguiente comando:

```jsx
db.productos_comprados.find().pretty()
```

---

### 17. Obtenga una nueva colección de productos, cuyos nombres incluyan el string “111”. En cada documento (cada producto) se debe agregar un atributo “purchases” que consista en un array con todas las “compras” en donde se incluye.

```jsx
db.products.aggregate([
  { $match: { name: /.*111.*/ } },
  {
    $lookup: {
      from: "purchases",
      localField: "name",
      foreignField: "productName",
      as: "purchases"
    }
  },
  { $out: "productos_nuevos" }
]);
```

- Observación
    
    Como el enunciado no especifica que es lo que se debe proyectar a la salida, se optó por proyectar todos los campos. Además, si un producto no ha sido incluido en ninguna compra se mostrará su campo purchases como un arreglo vacio. (purchases: [])
    

Por último, para verificar el contenido de la colección resultante de la ejecución del código anterior, debemos utilizar:

```jsx
db.productos_nuevos.find().pretty()
```

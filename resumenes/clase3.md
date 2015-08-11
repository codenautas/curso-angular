# Clase 3
11/8/2015

# tags Angular

funcion          |	uso
-----------------|-----
<ng-view>        | es el lugar donde se van a dibujar las vistas con el módulo angular-router
$html.get("url") | hace la llamda ajax y devuelve una promesa

# funciones Angular

funcion          |	uso
-----------------|-----
$html            | es un parámetro autobinding que recibe el controlador
$html.get("url") | hace la llamda ajax y devuelve una promesa
app.config()     | para configurar la aplicación
$routeProvider   | es un parámetro autobinding que recibe el `app.config`
$routeProvider.when | para definir qué vista tomar según el `#path`
$routeProvider.otherwise | para definir qué hacer si no está contemplado el `#path`

# Desarrollo

Vamos a ver routers de Angular para armar formularios dinámicos. 

En un ambiente productivo los metadatos de la encuesta vienen desde el backend, 
ahora vamos a usar los json que están en clase3/data:

Estructura actual del ejemplo:
  1. Grupo: define una unidad visual
  2. Campo: define un dato que se va a cargar, con la siguiente info: id, nombre, tipo
  3. Cuando el tipo es "sel" tengo especificada las opciones que se pueden elegir

Luego vamos a querer que el formulario responda según lo datos (que no pregunte trabajo a los menores). 
Para eso hay una propiedad "mostrar" con la condición que se necesita para mostrar ese grupo. 

Agregamos los links al html y probamos `npm start` que todo anda

Utilizamos la función $html para hacer la llamada AJAX asincrónica (con promesas) y lo ponemos en un ng-repeat para verlo

## Single page application

Vamos a usar **router** para ir mostrando cada parte de la aplicación. 
El **router** va a tomare el trabajo de ir ocultando las partes o **vistas**.
  1. Lo primero que decimos es dónde queremos las vistas con el tag `ng-view`
  2. Luego metemos en otro achivo dentro de views (views/lista.html) lo que va a la sección
  3. iniciamo `app.config();` en el módulo ya definido
  4. ahí metemos un `$routeProvider` al que le configuramos las direcciones que sabemos mandar a vistas

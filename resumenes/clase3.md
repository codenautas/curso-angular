# Clase 3
11/8/2015

# funciones Angular

funcion          |	uso
-----------------|-----
$html            | es un parámetro autobinding que recibe el controlador
$html.get("url") | hace la llamda ajax y devuelve una promesa

# Desarrollo

Vamos a ver ruters de Angular para armar formularios dinámicos. 

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

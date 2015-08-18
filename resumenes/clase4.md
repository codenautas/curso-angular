# Clase 4
11/8/2015

# tags Angular

tag              | uso
-----------------|-----
`ng-switch`      | para elegir entre tags
`ng-model`       | para tomar los datos

# funciones Angular

funcion          |	uso
-----------------|-----
$routeProvider.when({controller:, controllerAs:}) | para asociar un controlador a la vista en forma dinámica

# Desarrollo

Cambiamos el lugar donde se especifica cuál es el controlador de una vista. 
Antes lo poníamos dentro de la vista en la directiva `ng-controller`. 
Ahora lo definimos dinámicamente desde la aplicación de Angular. 
Así podemos tener para la misma vista distintos controladores. 

*Un controlador sirve a una vista, una vista puede tener varios controladores*

Las funciones asincrónicas, por ejemplo $http para hacer la llamadas ajax, tardan. 
Dentro del controlador hay que inicializar los datos de alguna manera 
(que son los que se irán mostrando mientras ocurra la demora).

En la clase 4 en `form.html` vamos agregando los elementos a la vista 
para ir viendo los nombres de las preguntas y los campos.

Ahora tenemos que poner el tag input, pero según el tipo de la variable vamos a usar un input o un select;
para decidir cual vamos a usar `ng-switch`. Y ponemos dentro los inputs. 

Ahora queremos empezar a reaccionar con los datos que carga el usuario para eso vamos a usar `ng-model`

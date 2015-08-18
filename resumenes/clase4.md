# Clase 4
18/8/2015

# tags Angular

tag              | uso
-----------------|------------------------------------------
`ng-switch`      | para elegir entre tags
`ng-model`       | para tomar los datos
`ng-click`       | para ejecutar una función desde un botón

# funciones Angular

funcion          |	uso
-----------------|-----
$routeProvider.when({controller:, controllerAs:}) | para asociar un controlador a la vista en forma dinámica
$scope.$watch    | revisa cambios en el modelo y acciona
$scope.$watchCollection     | lo mismo para sitauciones más complejas


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

## usando el concepto de modelo (directiva `ng-model`)

El modelo es el que va a sincronizar las variables del modelo y los inputs. 
En ng-model ponemos la expresión con la que se obtiene la variable (probablemente dentro de un objeto)
donde guardar los datos. Luego **todo se sincroniza automáticamente**. 

## vamos a grabar los datos en el servidor (`ng-click`)

La función debe estar definida dentro del controlador. 
Ahí podemos hacer la llamada AJAX que necesitemos para acceder a los datos. 

## filtros (reaccionar en base a cambios)

La función $watch nos permite registrar un par de funciones, 
la primera se evalúa todo el tiempo y es la que tiene el disparador, 
cuando esa función devuelva un valor distinto que la vuelta anterior se dispara la segunda función. 

`$scope.$watch(disparador, ejecutador)`

ejemplo:

```js
$scope.$watch(function(scope){
    return vm.edad;
}, function(){
    vm.esconder.preguntasMayores = vm.edad<18;
});
```

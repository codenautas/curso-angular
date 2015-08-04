# Clase 2

4/8/2015 

## package.json

clave    | uso
---------|-------
dependencies | para indicar de qué módulos o librerías externas dependemos, al ponerlo acá no tenemos que incluir el código de esos módulos dentro de nuestro repositorio
prestart | lo que se ejecuta antes del start

## tags AngularJS
estructura          | uso
--------------------|-------------------
ng-app="nombre_app" | define y une el HTML con el javascript
ng-controller="nombre_controlador" | indica dónde unir los datos
ng-hide="expresion" | oculta si la expresión es falsa
ng-show="expresion" | muestra solamente si la expresión es verdadera
ng-class="{nombre: expresion}" | asigna ese nombre de clase si la expresión estrue

## funciones Angular
funcion    | uso
-----------|---------
`angular.module("nombre", [])`                | crea el módulo angular
`app.controller("nombre", function(){ ... })` | define un controlador

## Javascript

### módulos

Para hacer un ***módulo*** (o sea una estructura JS que tenga variables internas privadas que no se vean en otros lados (o sea que no sean globales) se usa el concepto de clausura y la estructura function. Así:

```js

(function(){

   var local1='...';
   var local2='etc';
   
})();
```

esto funciona porque se crea una función anónima (dentro del primer par de paréntesis) que es ejecutada inmediatamente, gracias a los segundos paréntesis que es la sitanxis de ejecutar funciones (`f()`). Luego esas variables existen y solo ahí dentro.

## conceptos
### inyección de dependencias

cuando Angular ve que function dentro de `app.controller`  recibe un parámetro llamado `$scope` inyecta un objeto especial que ya está inicializdo de tipo `Scope`. Ese objeto ya tiene algunas propiedades que después vamos a poder usar. 

Ejemplo:
```js
    app.controller("lista2",["$scope", function($scope){
        $scope.publicaciones=[1995, 1994, 1993, 1992];
    }]);
```

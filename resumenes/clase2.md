# Clase 2

4/8/2015 

## package.json

clave    | uso
---------|-------
dependencies | para indicar de qué módulos o librerías externas dependemos, al ponerlo acá no tenemos que incluir el código de esos módulos dentro de nuestro repositorio
prestar | lo que se ejecuta antes del start

## tags AngularJS

## Javascript

Para hacer un módulo (o sea una estructura JS que tenga variables internas privadas que no se vean en otros lados (o sea que no sean globales) se usa el concepto de clausura y la estructura function. Así:

```js

(function(){

   var local1='...';
   var local2='etc';
   
})();
```

esto funciona porque se crea una función anónima (dentro del primer par de paréntesis) que es ejecutada inmediatamente, gracias a los segundos paréntesis que es la sitanxis de ejecutar funciones (`f()`). Luego esas variables existen y solo ahí dentro.

# Clase 5
25/8/2015

# tags Angular

tag              | uso
-----------------|------------------------------------------
ng-bind          | es como ng-model pero para el textContent (en vez de para el value)

# funciones Angular

funcion          |	uso
-----------------|-----
app.service      | pasarle una callback que provee una lista de funciónes



# Desarrollo

Vamos a usar **service** para los servicios (por ejemplo la interacción con el servidor). Ej:

```js

app.service("nombreServicio", function($http){
    return {
        getEncuestas: function(){
            var url = "data/eah2013.json";
            return $http.get(url);
        }
    };
});
```

para después usar ese servicio en el controlador

```js
app.controller("listaController", function (encuestaService) {
    var vm = this;
    vm.lista = [];

    encuestaService.getEncuestas().then(function (resp) {
        vm.lista = resp.data;
    });
    // ...
```

A diferencia de los controladores, los servicios existen una sola vez, los controladores se construyen y destruyen cuando se cambia de vista. 

## Creación de nuevas directivas

Se pueden usar para hacer el HTML más legible. 
```js
app.directive('miDebugTag", function(){
    return {
        template:'<div>mi debug</div>';
    };
});

  * El template se puede traer desde una url con `templateUrl: "url"`
  * La directiva se puede restringir a un atributo o elemento o clase (según su inicial). Ej: `restrict: "A"` (ojo con las directivas con elemento pueden fallar en Internet Explorer)

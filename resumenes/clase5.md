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

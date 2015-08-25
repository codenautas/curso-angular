(function () {

    var app = angular.module("encuestasApp", ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider
            // lista de encuestas y formularios
            .when("/encuestas", {
                templateUrl: "views/encuestas.html",
                controller: "listaController",
                controllerAs: "encuestas"
            })
            // formulario dinámico
            .when("/encuestas/:encId/forms/:formId", {
                templateUrl: "views/form.html",
                controller: "formController",
                controllerAs: "form" // es lo que pongo en el tag de la vista formController as form
            })
            // por omisión ir a la lista
            .otherwise({
                redirectTo: "/encuestas"
            });
    });

    app.controller("listaController", function ($http) {
        var vm = this;

        // precargar lista vacía
        vm.lista = [];

        // obtener lista desde JSON
        var url = "data/eah2013.json";
        $http.get(url).then(function (resp) {
            vm.lista = resp.data;
        });
    });

    app.controller("formController", function ($routeParams, $http,$scope) {
        var vm = this;

        // precargar formulario vacío
        vm.data = {};

        // obtener datos desde JSON según parámetros
        var encId = $routeParams.encId.toLowerCase();
        var formId = $routeParams.formId.toLowerCase();
        var url = "data/" + encId + "_" + formId + ".json";
        $http.get(url).then(function (resp) {
            vm.id = resp.data.id;
            vm.nombre = resp.data.nombre;
            vm.preguntas = resp.data.preguntas;
            var watches=[];
            vm.preguntas.filter(function(pregunta){
                return pregunta.filtro;
            }).forEach(function(pregunta){
                watches.push(pregunta.filtro);
            });
/*            $scope.$watchCollection(function(scope){
                return watches.map(function(filtro){
                    var split= filtro.campo.split(".");
                    var valor=
                });
            })*/
        });
        vm.grabar=function(){
            var url="respuesta/" + encId + "/" + formId; 
            $http.post(url,vm.respuestas).then(function(resp){
                // Exito
                alert("Envío exitoso");
            },function(resp){
                alert("Hubo problemas al enviar la respuesta");
            });
        };
        vm.filtros={};
        $scope.$watch(function(scope){
            return vm.respuestas && vm.respuestas.DI1 && vm.respuestas.DI1.edad; 
        },function(){
            if ( vm.respuestas && vm.respuestas.DI1 &&vm.respuestas.DI1.edad >=10){
                vm.filtros.T1 = false;
            }else{
                vm.filtros.T1=true;
            }
        })
    });

})();

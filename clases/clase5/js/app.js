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
                controllerAs: "form"
            })
            // por omisión ir a la lista
            .otherwise({
                redirectTo: "/encuestas"
            });
    });
    app.service("encuestasService", function ($http) {
        return{
            getEncuestas: function () {
                 var url = "data/eah2013.json";
                 return $http.get(url);
            }
            
        };
    });
    app.controller("listaController", function ( encuestasService) {
        var vm = this;

        // precargar lista vacía
        vm.lista = [];

        // obtener lista desde JSON
        /*
        var url = "data/eah2013.json";
        $http.get(url).then(function (resp) {
            vm.lista = resp.data;
        });
        */
        encuestasService.getEncuestas().then(function (resp) {
            vm.lista = resp.data;
        });
    });

    app.controller("formController", function ($routeParams, $http) {
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
        });
        vm.grabar=function() {
            var url ="respuesta/" + encId + "_" + formId ;
            $http.post(url,vm.respuestas).then(function(resp) {
                alert("Envio exitoso");
            },function(resp){;
                alert("Problemas al enviar encuesta");
            })
        }
    });

})();

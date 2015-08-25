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
    app.service("encuestasService", function ($http /*,$routeParams*/) {
        return{
            getEncuestas: function () {
                 var url = "data/eah2013.json";
                 //return $http.get(url);
                 /* nuevo */
                 return $http.get(url).then( function (resp) {
                    return resp.data;
                 });
                 
            },
            getFormulario: function (encId,  formId) {
                 var url = "data/" + encId + "_" + formId + ".json";
                // return $http.get(url);
                 /* nuevo */
                 return $http.get(url).then( function (resp) {
                    return resp.data;
                 });
            },
            grabarFormulario: function ( encId,  formId, datos) {
                 var url ="respuesta/" + encId + "_" + formId ;
                 return $http.post(url,datos);
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
            vm.lista = resp;
        });
    });

    app.controller("formController", function (encuestasService ,$routeParams /*, $http*/) {
        var vm = this;

        // precargar formulario vacío
        vm.data = {};

        // obtener datos desde JSON según parámetros
        
        var encId = $routeParams.encId.toLowerCase();
        var formId = $routeParams.formId.toLowerCase();
        /*
        var url = "data/" + encId + "_" + formId + ".json";
        $http.get(url).then(function (resp) {
            vm.id = resp.data.id;
            vm.nombre = resp.data.nombre;
            vm.preguntas = resp.data.preguntas;
        });
        */
        encuestasService.getFormulario(encId,  formId).then(function (resp) {
            vm.id = resp.id;
            vm.nombre = resp.nombre;
            vm.preguntas = resp.preguntas;
        });
        vm.grabar=function() {
            //var url ="respuesta/" + encId + "_" + formId ;
            encuestasService.grabarFormulario( encId,  formId, vm.respuestas).then(function(resp) {
                alert("Envio exitoso");
            },function(resp){;
                alert("Problemas al enviar encuesta");
            })
        }
        /* copio lo de filtros que faltaba
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
       */ 
     });
    app.directive( "miDebugTag",function(){
            return{
                templateUrl: "directives/miDebugTag.html",  /*"<h3>Objeto respuestas:</h3>{{form.respuestas}}"*/
                restrict: "A"
            };
    });

})();

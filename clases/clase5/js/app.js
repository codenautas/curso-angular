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

    app.service("encuestasService",function($http){ //quiero concentrar todas las llamadas al servidor. Esta función tiene que devolver un objeto que va a ser el servicio. //Los servicios son únicos. Los controladores se crean y se destruyen al levantar una vista
        // var serverUrl="https://server.ba.gob.ar"
        return {
            getEncuestas: function(){
                var url = "data/eah2013.json";
                return $http.get(url).then(function(resp){
                    return resp.data;
                });
            },
            getFormulario: function(encId,formId){
                var url = "data/" + encId + "_" + formId + ".json";
                return $http.get(url).then(function(resp){
                    return resp.data;
                });
            },
            grabarFormulario: function(encId,formId,datos){
                var url="respuesta/" + encId + "/" + formId; 
                return $http.post(url,datos).then(function(resp){
                    return resp.data;
                });
            }
        };
        
    });
    
    app.controller("listaController", function (encuestasService) {
        var vm = this;

        // precargar lista vacía
        vm.lista = [];

        // obtener lista desde JSON
        /*var url = "data/eah2013.json";
        $http.get(url).then(function (resp) {
            vm.lista = resp.data;
        });*/
        encuestasService.getEncuestas().then(function (data) {
            vm.lista = data;
        });
    });
     // , $http
    app.controller("formController", function ($routeParams,$scope,encuestasService) {
        var vm = this;

        // precargar formulario vacío
        vm.data = {};

        // obtener datos desde JSON según parámetros
        var encId = $routeParams.encId.toLowerCase();
        var formId = $routeParams.formId.toLowerCase();
        encuestasService.getFormulario(encId,formId).then(function (data) {
            vm.id = data.id;
            vm.nombre = data.nombre;
            vm.preguntas = data.preguntas;
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
       /* var url = "data/" + encId + "_" + formId + ".json";
        $http.get(url)*/
        vm.grabar=function(){
            encuestasService.grabarFormulario(encId,formId,vm.respuestas)
            /*var url="respuesta/" + encId + "/" + formId; 
            $http.post(url,vm.respuestas)*/.then(function(data){
                // Exito
                alert("Envío exitoso");
            },function(data){
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
    //Angular entiende miDebugTag=mi-debug-tag
    app.directive("miDebugTag",function(){
        return {
            templateUrl: "directives/miDebugtag.html", 
            restrict: "E" //Elemento Atributo Clase EAC. En este caso "restrict A" restringite a atributo
        };
    })
})();

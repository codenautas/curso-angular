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
    
    app.service("encuestasService", function($http){
       return {
          getEncuestas: function(){
             var url = "data/eah2013.json";
             //return $http.get(url);
             /*nuevo*/
             return $http.get(url).then(function (resp) {
                return resp.data; 
             });
          },
          getFormulario: function(encId, formId){
             var url = "data/" + encId + "_" + formId + ".json";
             //return $http.get(url);
             /* nuevo */
             return $http.get(url).then(function(resp) {
                return resp.data;
             });
          },
          grabarFormulario: function(encId, formId, datos){
             var url = "respuesta/" + encId + "_" + formId;
             return $http.post(url, datos);
          }
       }
    });

    app.controller("listaController", function (encuestasService) {
        var vm = this;

        // precargar lista vacía
        vm.lista = [];

        // obtener lista desde JSON
        /* var url = "data/eah2013.json";
        $http.get(url).then(function (resp) {
            vm.lista = resp.data;
        }); */
        encuestasService.getEncuestas().then(function (resp) {
            vm.lista = resp;
        });
    });

    app.controller("formController", function (encuestasService, $routeParams) {
        var vm = this;

        // precargar formulario vacío
        vm.data = {};

        // obtener datos desde JSON según parámetros
        var encId = $routeParams.encId.toLowerCase();
        var formId = $routeParams.formId.toLowerCase();
        //var url = "data/" + encId + "_" + formId + ".json";
        encuestasService.getFormulario(encId,formId).then(function (resp) {
            vm.id = resp.id;
            vm.nombre = resp.nombre;
            vm.preguntas = resp.preguntas;
            /*
            var watches = [];
            vm.preguntas.filter(function (pregunta){
                return pregunta.filtro;
            }).forEach(function(pregunta){
                watches.push(pregunta.filtro);
            });
            
            
            vm.todosLosFiltros = [];
            vm.preguntas.filter(function (pregunta){
                  return pregunta.filtro;
                }).forEach(function(pregunta){
                var filtroObj={};
                var filtroExp ='vm.respuestas && vm.respuestas.' + pregunta.filtro["campo"].split(".")[0] + ' && vm.respuestas.' +
                    pregunta.filtro["campo"] + pregunta.filtro["cond"] + pregunta.filtro["ref"];
                filtroObj[pregunta.id]=filtroExp;
                vm.todosLosFiltros.push(filtroObj);
                });
          */
          //console.log(vm.todosLosFiltros[0].T1);
          /* $scope.$watchCollection(function(scope){
                return watches.map(function(filtro){
                    var split= filtro.campo.split(".");
                    var valor=
                });
            })
          */
        });
        
        vm.grabar = function() {
          //alert(2);
          //var url = "encuesta/" + encId + "/" + formId;
          encuestasService.grabarFormulario(encId,formId, vm.respuestas).then(function(resp){
            //exito
            alert("Envío exitoso!");
          }, function (){
            alert("Problmas al enviar la encuesta");
          });
        };

        /*
        vm.filtros={};
        $scope.$watch(function(scope){
          return vm.respuestas && vm.respuestas.DI1 && vm.respuestas.DI1.edad;
        }, function (resp){
             if (vm.respuestas&&vm.respuestas.DI1&&vm.respuestas.DI1.edad>=10) {
                vm.filtros.T1 = false;
             } else{
                vm.filtros.T1 = true;
             }
             }); */
     });
     
    app.directive("miDebugTag", function() {
         return{
           templateUrl: "directives/miDebugTag.html",
           restrict: "C"
         };
    })

})();

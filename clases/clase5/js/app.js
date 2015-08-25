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
             return $http.get(url);
          }
       }
    });

    app.controller("listaController", function ($http, encuestasService) {
        var vm = this;

        // precargar lista vacía
        vm.lista = [];

        // obtener lista desde JSON
        /* var url = "data/eah2013.json";
        $http.get(url).then(function (resp) {
            vm.lista = resp.data;
        }); */
        encuestasService.getEncuestas().then(function (resp) {
            vm.lista = resp.data;
        });
    });

    app.controller("formController", function ($routeParams, $http, $scope) {
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
          var url = "encuesta/" + encId + "/" + formId;
          $http.post(url, vm.respuestas).then(function(resp){
            //exito
            alert("Envío exitoso!");
          }, function (){
            alert("Problmas al enviar la encuesta");
          });
        };

        
        vm.filtros={};
        $scope.$watch(function(scope){
          return vm.respuestas && vm.respuestas.DI1 && vm.respuestas.DI1.edad;
          vm.respuestas && vm.respuestas.DI1.edad && vm.respuestas.DI1.edad>=10
        }, function (){
             if (vm.respuestas&&vm.respuestas.DI1      &&vm.respuestas.DI1.edad>=10) {
                 vm.respuestas&&vm.respuestas.DI1.edad && vm.respuestas.DI1.edad>=10
                vm.filtros.T1 = false;
             } else{
                vm.filtros.T1 = true;
             }
             });
     });

})();

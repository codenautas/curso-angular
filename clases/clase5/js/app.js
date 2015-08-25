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
            },
            getFormulario: function(encId, formId){
                var url = "data/" + encId + "_" + formId + ".json";
                return $http.get(url);
            }
        };
    });
    
    app.controller("listaController", function (encuestasService) {
        var vm = this;

        // precargar lista vacía
        vm.lista = [];

        // obtener lista desde JSON
        encuestasService.getEncuestas().then(function (resp) {
            vm.lista = resp.data;
        });
    });

    app.controller("formController", function ($routeParams, $scope, encuestasService) {
        var vm = this;

        // precargar formulario vacío
        vm.data = {};

        // obtener datos desde JSON según parámetros
        var encId = $routeParams.encId.toLowerCase();
        var formId = $routeParams.formId.toLowerCase();
        encuestasService.getFormulario(encId, formId).then(function (resp) {
            vm.id = resp.data.id;
            vm.nombre = resp.data.nombre;
            vm.preguntas = resp.data.preguntas;
            
            var watches=[];
            vm.preguntas.filter(function(pregunta){
                return pregunta.filtro;
            }).forEach(function(pregunta){
                watches.push(pregunta.filtro)
            });
            
            /*
            $scope.watchCollection(function(scope){
                return 
            });
            */
            vm.filtros = [];
            
            $scope.$watch(function(scope){
                return vm.respuestas.DI1.edad;
            }, function(){
                vm.filtros.T1 = !(vm.respuestas.DI1.edad>=10);
            });
        });
        
        vm.grabar = function(){
            var ulr="/grabar/"+encId+"/"+formId;
            $http.post(url, vm.respuestas).then(function(){
                alert('grabado ok');
            }).catch(function(err){
                alert('problema '+JSON.stringify(err));
            });
        }
    });

})();

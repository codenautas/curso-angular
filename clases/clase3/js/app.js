(function(){
    var app = angular.module("encuestasApp", ["ngRoute"]);
    //la fucionalidad del routing:
    app.config(function($routeProvider){
        $routeProvider.when("/encuestas", {
            templateUrl:"views/lista.html"
        }).when("/encuestas/:encId/forms/:formId", {
            templateUrl: "views/form.html"
        }).otherwise({
            redirectTo: "/encuestas"
        });
    });
    
    app.controller("listaController", function ($http) {
        var vm = this;
        vm.lista = [];
        
        $http.get("data/eah2013.json").then(function(resp){
            vm.lista = resp.data
        });
    
    });
    
    app.controller("formController", function($routeParams, $http){
       var vm = this;
       var encId = $routeParams.encId.toLowerCase();
       var formId = $routeParams.formId.toLowerCase();
       $http.get("data/" + encId + "_" + formId + ".json").then(function (resp){
            vm.id = resp.data.id;
            vm.nombre = resp.data.nombre;
       });
    });

})()
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

})()
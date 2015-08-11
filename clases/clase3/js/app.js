"use strict";

(function(){
    
    var app = angular.module("encuestasApp", ["ngRoute"]);
    
    app.config(function($routeProvider){
        $routeProvider.when("/encuestas",{
            templateUrl:"views/lista.html"
        }).when("/encuesta/:encId/form/:formId",{
            templateUrl:"views/form.html"
        }).otherwise({
            redirectTo:"/encuestas"
        });
    });
    
    app.controller("listaController", function($http){
        
        var vm = this;
        
        vm.lista = [];
        
        $http.get("data/eah2013.json").then(function(resp){
            vm.lista = resp.data
        });
        
    });
    
    app.controller("formController", function($http, $routeParams){
        
        var vm = this;
        
        var encId = $routeParams.encId;
        var formId = $routeParams.formId;
        
        vm.lista = [];

        $http.get(("data/" + encId + "_" + formId + ".json").toLowerCase()).then(function(resp){
            vm.id = resp.data.id
            vm.nombre = resp.data.nombre
        });
        
    });
    
})();
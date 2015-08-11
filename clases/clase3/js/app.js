"use strict";

(function(){
    
    var app = angular.module("encuestasApp", []);
    
    app.controller("listaController", function($http){
        
        var vm = this;
        
        vm.lista = [];
        
        $http.get("data/eah2013.json").then(function(resp){
            vm.lista = resp.data
        });
        
    });
    
})();
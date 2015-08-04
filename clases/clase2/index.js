"use strict";

(function (){

    var app = angular.module("publicacionesApp",[]);
    
    app.controller("ListaPub",function(){
        this.publicaciones=[2015, 2014, 2013];
    });

    app.controller("lista2",["$scope", function($scope){
        $scope.publicaciones=[1995, 1994, 1993, 1992];
    }]);

})();
"use strict";

(function (){

    var app = angular.module("publicacionesApp",[]);
    
    app.controller("ListaPub",function(){
        this.publicaciones=[2015, 2014, 2013];
        // this.publicaciones=[];
    });

})();
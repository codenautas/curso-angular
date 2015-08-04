"use strict";

(function (){

    var app = angular.module("publicacionesApp",[]);
    
    app.controller("ListaPub",function(){
        this.publicaciones=[{
            title:'Anuario estadístico',
            year:2015
        }, {
            title:'Cartografía',
            year:2014
        }, {
            title:'Encuesta Anual de Hogares',
            year:2013
        }, {
            title:'Canasta alimentaria',
            year:2013
        }];
        // this.publicaciones=[];
        
        this.isCurrent=function(pub){
            return pub.year === (new Date()).getFullYear()
        }
    });

})();
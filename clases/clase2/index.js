"use strict";

(function (){

    var app = angular.module("publicacionesApp",[]);
    
    app.controller("ListaPub",function(){
        this.publicaciones=[{
            title:'Anuario estadístico',
            url:'http://estadisticaciudad.gob.ar/publicaciones/1.pdf',
            type:'PDF',
            year:2015
        }, {
            title:'Cartografía',
            url:'http://estadisticaciudad.gob.ar/publicaciones/2.pdf',
            type:'PDF',
            year:2014
        }, {
            title:'Encuesta Anual de Hogares',
            url:'http://estadisticaciudad.gob.ar/publicaciones/3.doc',
            type:'DOC',
            year:2013
        }, {
            title:'Canasta alimentaria',
            url:'http://estadisticaciudad.gob.ar/publicaciones/5.pdf',
            type:'PDF',
            year:2013
        }];
        // this.publicaciones=[];
        
        this.isCurrent=function(pub){
            return pub.year === (new Date()).getFullYear()
        }
    });

})();
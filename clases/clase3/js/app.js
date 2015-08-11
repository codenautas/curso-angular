(function(){
    var app = angular.module("encuestasApp",["ngRoute"]);
    app.config(function($routeProvider){
        $routeProvider.when("/encuestas",{
            templateUrl:"views/lista.html"
        }).when("/encuestas/:encId/forms/:formId",{
            templateUrl:"views/form.html"
        }).otherwise({
            redirectTo:"/encuestas"
        });
    });
    app.controller("listaController",function($http){
        var vm = this; //view model
        vm.lista=[]; //Este this pertenece al controlador
        $http.get("data/eah2013.json").then(function(resp){
            vm.lista=resp.data;     //en .data tengo el contenido de mi archivo json. Me devuelve el objeto, si fuera 
                                    // un  .txt, me devolver�a un string
                                    // Si ac� pongo un this, no es el mismo que est� afuera. Porque el this depende del contexto, apunta al objeto para el cual la funci�n pertenece. Un this ac�, pertenece a la promesa.
        });
    });
    app.controller("formController",function($routeParams,$http){ //$routeParams es un objeto que tiene 1 propiedad por cada par�metro en la url
        var vm=this;
        var formId=$routeParams.formId.toLowerCase();
        var encId=$routeParams.encId;
        $http.get("data/"+encId+"_"+formId+".json").then(function(resp){
            vm.id=resp.data.id;
            vm.nombre=resp.data.nombre;
        });
    });
})();
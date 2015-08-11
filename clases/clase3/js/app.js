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
    
})();
"use strict";
angular.module("medicaldevice")
.controller("ModelController", ['$http', '$routeParams', function($http, $routeParams) {
  var devicefinder = this;
  devicefinder.lists = [];
  devicefinder.lists = $http.get("/sono/model/"+$routeParams.id).then(function(response){
    console.log($routeParams.id);
    return response.data;
  });
}]);

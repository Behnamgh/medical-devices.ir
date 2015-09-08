"use strict";
angular.module("medicaldevice")
.controller("MindrayController", ['$http', function($http) {
  var devicefinder = this;
  devicefinder.lists = [];
  $http.get("/brands/brands?brandname=mindray").success(function(data) {
    devicefinder.lists = data;
  });
}]);



"use strict";
angular.module("medicaldevice")
.controller("SiemensController", ['$http', function($http) {
  var devicefinder = this;
  devicefinder.lists = [];
  $http.get("/brands/brands?brandname=siemens").success(function(data) {
    devicefinder.lists = data;
  });
}]);

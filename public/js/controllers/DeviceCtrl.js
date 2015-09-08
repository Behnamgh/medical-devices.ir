"use strict";
angular.module("medicaldevice")
.controller("DeviceCtrl", ['$http', function($http) {
  var devicefinder = this;
  devicefinder.lists = [];
  $http.get("/brands/brands?brandname="+$stateParams.).success(function(data) {
    devicefinder.lists = data;
  });
}]);

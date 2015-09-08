"use strict";
angular.module("medicaldevice")
.controller("PhilipsController", ['$http', function($http) {
  var devicefinder = this;
  devicefinder.lists = [];
  $http.get("/brands/brands?brandname=philips").success(function(data) {
    devicefinder.lists = data;
  });
}]);

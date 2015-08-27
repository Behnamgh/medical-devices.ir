"use strict";
(function() {
  var app = angular.module("devicefinder", []);

  app.controller("DeviceController", ["$http", function($http) {
    var devicefinder = this;
    devicefinder.lists = [];
    $http.get("/brands/mindray").success(function(data) {
      devicefinder.lists = data;
    });
  }]);
})();

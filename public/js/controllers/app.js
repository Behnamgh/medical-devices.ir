"use strict";
(function() {
  var app = angular.module("devicefinder", []);

  app.controller("MindrayController", ["$http", function($http) {
    var devicefinder = this;
    devicefinder.lists = [];
    $http.get("/brands/brands?brandname=mindray").success(function(data) {
      devicefinder.lists = data;
    });
  }]);

  app.controller("PhilipsController", ["$http", function($http) {
    var devicefinder = this;
    devicefinder.lists = [];
    $http.get("/brands/brands?brandname=philips").success(function(data) {
      devicefinder.lists = data;
    });
  }]);

  app.controller("SiemensController", ["$http", function($http) {
    var devicefinder = this;
    devicefinder.lists = [];
    $http.get("/brands/brands?brandname=siemens").success(function(data) {
      devicefinder.lists = data;
    });
  }]);

})();

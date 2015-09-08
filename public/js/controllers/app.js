"use strict";
angular.module("medicaldevice", ['ui.router']);

angular.module("medicaldevice")
.config(function($stateProvider){
    $stateProvider
    .state('index', {
      url: "/",
      templateUrl: "/main"
    })
    .state('sono', {
      url: "/sono",
      templateUrl: "/sono"
    })
    .state('mindray', {
      url: "/sono/mindray",
      templateUrl: "/sono/mindray",
      controller: "MindrayController"
    })
    .state('philips', {
      url: "/sono/philips",
      templateUrl: "/sono/philips",
      controller: "PhilipsController"
    })
    .state('siemens', {
      url: "/sono/siemens",
      templateUrl: "/sono/siemens",
      controller: "SiemensController"
    })
    .state('model', {
      url: "/sono/model/:modelid",
      templateUrl: "/sono/model/preview"
    })
  })
  .controller("PhilipsController", ['$http', function($http) {
    var devicefinder = this;
    devicefinder.lists = [];
    $http.get("/brands/brands?brandname=philips").success(function(data) {
      devicefinder.lists = data;
    });
  }])
  .controller("SiemensController", ['$http', function($http) {
    var devicefinder = this;
    devicefinder.lists = [];
    $http.get("/brands/brands?brandname=siemens").success(function(data) {
      devicefinder.lists = data;
    });
  }])
  .controller("MindrayController", ['$http', function($http) {
    var devicefinder = this;
    devicefinder.lists = [];
    $http.get("/brands/brands?brandname=mindray").success(function(data) {
      devicefinder.lists = data;
    });
  }])
  .controller("ModelController", ['$http', '$stateParams', function($http, $stateParams) {
    var devicefinder = this;
    devicefinder.lists = [];
    $http.get("/sono/model/modelpre/"+$stateParams.modelid).success(function(data) {
      devicefinder.lists = data;
    });
  }]);

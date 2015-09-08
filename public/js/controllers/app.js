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
    .state('device', {
      url: "/sono/:brandname",
      templateUrl: "/sono/brandpreview"
    })

    .state('model', {
      url: "/sono/model/:modelid",
      templateUrl: "/sono/model/preview"
    })
  })
  .controller("BrandController", ['$http', '$stateParams', function($http, $stateParams) {
    var devicefinder = this;
    devicefinder.lists = [];
    $http.get("/brands/brands?brandname="+$stateParams.brandname).success(function(data) {
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

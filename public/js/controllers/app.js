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
      url: "/device/:type",
      templateUrl: "/type"
    })
    .state('device', {
      url: "/:type/:brandname",
      templateUrl: "/sono/brandpreview"
    })
    .state('model', {
      url: "/sono/model/:modelid",
      templateUrl: "/sono/model/preview"
    })
    .state('aboutus', {
      url: "/aboutus",
      templateUrl: "/angular/aboutus"
    })
    .state('contactus', {
      url: "/contactus",
      templateUrl: "/angular/contactus"
    })
    .state('search', {
      url: "/browser/:searchkey",
      templateUrl: "/angular/search"
    })
  })
  .filter('unique', function() {
 return function(collection, keyname) {
    var output = [],
        keys = [];

    angular.forEach(collection, function(item) {
        var key = item[keyname];
        if(keys.indexOf(key) === -1) {
            keys.push(key);
            output.push(item);
        }
    });
    return output;
 };
})
  .controller("BrandmodelController", ['$http', '$stateParams', function($http, $stateParams) {
    var devicefinder = this;
    devicefinder.lists = [];
    $http.get("/"+$stateParams.type+"/brands/"+$stateParams.brandname).success(function(data) {
      devicefinder.lists = data;
    });
  }])
  .controller("BrandController", ['$http', '$stateParams', function($http, $stateParams) {
    var devicefinder = this;
    devicefinder.lists = [];
    $http.get("/brands/"+$stateParams.type).success(function(data) {
      devicefinder.lists = data;
    });
  }])
  .controller("SearchController", ['$http', '$stateParams', function($http, $stateParams) {
    var devicefinder = this;
    devicefinder.lists = [];
    devicefinder.keyword = $stateParams.searchkey;
    $http.get("/search/"+$stateParams.searchkey).success(function(data) {
      devicefinder.lists = data;
    });
  }])
  .controller("ModelController", ['$http', '$stateParams', function($http, $stateParams) {
    var devicefinder = this;
    devicefinder.lists = [];
    $http.get("/sono/model/"+$stateParams.modelid).success(function(data) {
      devicefinder.lists = data;
    });
  }]);

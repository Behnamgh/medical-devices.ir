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
      templateUrl: "/search"
    })
    .state('compare1', {
      url: "/compare1/:modeltype/:model1id",
      templateUrl: "/compare1"
    })
    .state('compare2', {
      url: "/compare2/:modeltype/:brandname/:model1id",
      templateUrl: "/compare2"
    })
    .state('compare3', {
      url: "/compare3/:modeltype/:model1id/:model2id",
      templateUrl: "/compare3"
    })
    .state('device', {
      url: "/:type/:brandname",
      templateUrl: "/sono/brandpreview"
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
    $http.get("/searched/"+$stateParams.searchkey).success(function(data) {
      devicefinder.lists = data;
    });
  }])
  .controller("CompareController", ['$http', '$stateParams', function($http, $stateParams) {
    var device = this;
    device.device = [];
    $http.get("/"+$stateParams.modeltype+"/model/"+$stateParams.model1id).success(function(data) {
      device.device = data;
    });
    device.brand = [];
    $http.get("/brands/"+$stateParams.modeltype).success(function(data) {
      device.brand = data;
    });
  }])
  .controller("Compare2Controller", ['$http', '$stateParams', function($http, $stateParams) {
    var device = this;
    device.device = [];
    $http.get("/"+$stateParams.modeltype+"/model/"+$stateParams.model1id).success(function(data) {
      device.device = data;
    });
    device.model = [];
$http.get("/"+$stateParams.modeltype+"/brandsfilter/"+$stateParams.brandname+"/"+$stateParams.model1id).success(function(data) {
        device.model = data;
    });
  }])
  .controller("Compare3Controller", ['$http', '$stateParams', function($http, $stateParams) {
    var device = this;
    device.model1 = [];
    $http.get("/"+$stateParams.modeltype+"/model/"+$stateParams.model1id).success(function(data) {
      device.model1 = data;
    });
    device.model2 = [];
    $http.get("/"+$stateParams.modeltype+"/model/"+$stateParams.model2id).success(function(data) {
      device.model2 = data;
    });
  }])
  .controller("ModelController", ['$http', '$stateParams', function($http, $stateParams) {
    var devicefinder = this;
    devicefinder.lists = [];
    $http.get("/sono/model/"+$stateParams.modelid).success(function(data) {
      devicefinder.lists = data;
    });
  }]);

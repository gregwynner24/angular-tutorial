var myNinjaApp = angular.module("myNinjaApp", ["ngRoute", "ngAnimate"]);

myNinjaApp.config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when("/home", {
        templateUrl: "/src/view/home.html",
      })
      .when("/contact", {
        templateUrl: "./src/view/contact.html",
        controller: "ContactController",
      })
      .when("/contact-success", {
        templateUrl: "./src/view/contact-success.html",
        controller: "ContactController",
      })
      .when("/directory", {
        templateUrl: "./src/view/directory.html",
      })
      .otherwise({
        redirectTo: "/home",
      });
  },
]);

myNinjaApp.directive("randomNinja", [
  function () {
    return {
      restrict: "EA", //E stands for Element and A stands for Attribute
      scope: {
        ninjas: "=",
        title: "=",
      },
      //template: '{{title}}',
      /*template:
        '<div style="text-align:center;"><Img ng-src="{{ninjas[random].thumb}}" alt="Picture"></div>',*/

      templateUrl: "./src/view/random.html",
      transclude: true,
      replace: false,
      controller: function ($scope) {
        $scope.random = Math.floor(Math.random() * 4);
      },
    };
  },
]);

myNinjaApp.controller("NinjaController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.message = "hello from app.js";

    $scope.removeNinja = function (ninja) {
      var removedNinja = $scope.ninjas.indexOf(ninja);
      $scope.ninjas.splice(removedNinja, 1);
    };

    $scope.addNinja = function () {
      $scope.ninjas.push({
        name: $scope.newninja.name,
        belt: $scope.newninja.belt,
        rate: parseInt($scope.newninja.rate),
        available: true,
      });

      $scope.newninja.name = "";
      $scope.newninja.belt = "";
      $scope.newninja.rate = "";
    };

    $scope.removeAll = function () {
      $scope.ninjas = [];
    };

    //0002 - THIS CODE IS UPDATED
    $http.get("data/ninjas.json").then(function (response) {
      $scope.ninjas = response.data;
    });
    //0002 - END OF COMMENT

    //0001 - THIS CODE IS OUTDATED
    /*$http.get('data/ninjas.json').success(function(data){
    $scope.ninjas = data;
  });*/
    //0001 - END OF COMMENT

    /*$scope.ninjas =[{
    name: "Yoshi",
    belt: "blue",
    rate: 50,
    available: true,
    thumb: "src/img/cm.png"
  }];*/
  },
]);

/*----------------------------------
ContactController -- contact.html
----------------------------------*/

myNinjaApp.controller("ContactController", [
  "$scope",
  "$location",
  function ($scope, $location) {
    $scope.sendMessage = function () {
      $location.path("contact-success");
    };
  },
]);

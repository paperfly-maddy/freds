foodApp = angular.module('foodApp', ['ngRoute'])
.config(function($routeProvider,$locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/home', {
      templateUrl: '/partials/order.html',
      controller: 'homeCtrl'
    })
    .when('/', {
      templateUrl: '/partials/order.html',
      controller: 'homeCtrl'
    })
    .when('/admin', {
      templateUrl: '/partials/admin.html',
      controller: 'homeCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

var milongaApp = angular.module('milongaApp',['ngRoute','milongaApp.home','milongaApp.milongaList','milongaService']);

milongaApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: '../app/js/home/home.html',
            controller : 'HomeCtrl'
        }).
        when('/list', {
            templateUrl: '../app/js/milonga/milongaList.html',
            controller : 'milongaListCtrl'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }]);
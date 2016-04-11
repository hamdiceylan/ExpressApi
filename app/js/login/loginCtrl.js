var login = angular.module('milongaApp.login',[]);
login.controller('LoginCtrl',function ($scope,loginService,$location,$rootScope) {
    var user ={};
    $scope.Login = function (user) {
        console.log(user);
        loginService.authenticate($scope.user).then(function (success) {
            $rootScope.token = success.token;
            $rootScope.login = true;
            $location.path('/home');
        }).then(function (err) {
            console.log(err);
        });
    }
});
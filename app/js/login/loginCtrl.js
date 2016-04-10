var login = angular.module('milongaApp.login',[]);
login.controller('LoginCtrl',function ($scope,loginService) {
    var user ={};
    $scope.Login = function (user) {
        console.log(user);
        loginService.authenticate($scope.user).then(function (success) {
            console.log(success);
        });
    }
});
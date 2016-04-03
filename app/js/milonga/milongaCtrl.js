var home = angular.module('milongaApp.milongaList',[]);
home.controller('milongaListCtrl',function ($scope,apiService) {
    $scope.user = {};
    $scope.getList = function () {
        apiService.getMilongaList().then(function (success) {
            console.log(success);
            $scope.Datas = success;
        });
    }
    $scope.getList();

    $scope.SaveUser = function () {
        apiService.saveMilongaUser($scope.user).then(function (success) {
            console.log(success);
            $scope.Result = success;
            $scope.getList();
        });
        console.log($scope.user);
    }

    $scope.DeleteUser = function (user) {
        apiService.deleteMilongaUser(user._id).then(function (success) {
            $scope.Result = success;
            $scope.getList();
        });
    }
});
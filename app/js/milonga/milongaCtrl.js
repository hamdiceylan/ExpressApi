var home = angular.module('milongaApp.milongaList',[]);
home.controller('milongaListCtrl',function ($scope,apiService) {
    $scope.milonga = {};
    $scope.getList = function () {
        apiService.getMilongaList().then(function (success) {
            $scope.Milongas = success;
        });
    }
    $scope.getList();

    $scope.SaveMilonga = function () {
        apiService.saveMilonga($scope.milonga).then(function (success) {
            $scope.Result = success;
            $scope.getList();
        });
        console.log($scope.user);
    }

    $scope.DeleteMilonga = function (milonga) {
        apiService.deleteMilonga(milonga._id).then(function (success) {
            $scope.Result = success;
            $scope.getList();
        });
    }
});
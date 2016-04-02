var home = angular.module('milongaApp.milongaList',[]);
home.controller('milongaListCtrl',function ($scope,apiService) {
    $scope.getList = function () {
        apiService.getMilongaList().then(function (success) {
            console.log(success);
            $scope.Datas = success;
        });
    }
    debugger;
    $scope.getList();
});
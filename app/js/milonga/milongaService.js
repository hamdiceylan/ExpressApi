var milongaService = angular.module('milongaService',[]);

milongaService.factory('apiService',function ($http,$q) {
    var api = {};
    api.apiUrl = "http://localhost:8080/api/";
    api.getMilongaList = function () {
        var q = $q.defer();
        $http({
            type : 'GET',
            url : api.apiUrl + 'bears',
            headers : {'Content-type' : 'application/json'}
        }).success(function (success) {
            q.resolve(success);

        }).error(function (error) {
            q.reject(error);
        });
        return q.promise;
    };
    api.saveMilongaUser = function (user) {
        var q = $q.defer();
        $http({
            method : 'POST',
            url : api.apiUrl + 'bears',
            headers : {'Content-type' : 'application/json'},
            data : user
        }).success(function (success) {
            q.resolve(success);

        }).error(function (error) {
            q.reject(error);
        });
        return q.promise;
    };
    api.deleteMilongaUser = function (userId) {
        var q = $q.defer();
        $http({
            method : 'DELETE',
            url : api.apiUrl + 'bears/'+userId,
            headers : {'Content-type' : 'application/json'}
        }).success(function (success) {
            console.log(success);
            q.resolve(success);

        }).error(function (error) {
            q.reject(error);
        });
        return q.promise;
    };

    return api;
});
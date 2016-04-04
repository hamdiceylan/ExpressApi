var milongaService = angular.module('milongaService',[]);

milongaService.factory('apiService',function ($http,$q) {
    var api = {};
    //api.apiUrl = "https://expressapi.herokuapp.com/api/";
    api.apiUrl = "http://localhost:8080/api/";

    api.getMilongaList = function () {
        var q = $q.defer();
        $http({
            type : 'GET',
            url : api.apiUrl + 'milonga',
            headers : {'Content-type' : 'application/json'}
        }).success(function (success) {
            q.resolve(success);

        }).error(function (error) {
            q.reject(error);
        });
        return q.promise;
    };
    api.saveMilonga = function (milonga) {
        var q = $q.defer();
        $http({
            method : 'POST',
            url : api.apiUrl + 'milonga',
            headers : {'Content-type' : 'application/json'},
            data : milonga
        }).success(function (success) {
            q.resolve(success);

        }).error(function (error) {
            q.reject(error);
        });
        return q.promise;
    };
    api.deleteMilonga = function (milongaId) {
        var q = $q.defer();
        $http({
            method : 'DELETE',
            url : api.apiUrl + 'milonga/'+milongaId,
            headers : {'Content-type' : 'application/json'}
        }).success(function (success) {
            q.resolve(success);

        }).error(function (error) {
            q.reject(error);
        });
        return q.promise;
    };

    return api;
});
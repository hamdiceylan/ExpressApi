var loginService = angular.module('loginService',[]);

loginService.factory('loginService',function ($http,$q) {
    var api = {};
    //api.apiUrl = "https://expressapi.herokuapp.com/api/";
    api.apiUrl = "http://localhost:8080/api/";

    api.authenticate = function (user) {
        var q = $q.defer();
        $http({
            method : 'POST',
            url : api.apiUrl + 'authenticate',
            headers : {'Content-type' : 'application/json'},
            data : user
        }).success(function (success) {
            q.resolve(success);

        }).error(function (error) {
            q.reject(error);
        });
        return q.promise;
    };


    return api;
});
var app = angular.module("onlineApp", []);

app.controller("UserController", function ($scope, $log, $http, $window, $location, $timeout) {

    $scope.commentsList = [];
    $scope.isLoading = false;
    $scope.getUsers = function () {
        $scope.isLoading = true;

        $timeout(function () {
            $http.get("https://jsonplaceholder.typicode.com/comments").then(function success(response) {
                $scope.commentsList = response.data
                $scope.isLoading = !$scope.isLoading;
            }, function error(error) {
                if (error.status == -1) {
                    $scope.isLoading = false;
                }
                $window.location.href = '/error.html';
            });

        }, 2000);


    }

    $scope.getUsers();



});
var app = angular.module("onlineApp", []);

app.controller("UserController", function ($scope, $log, $http, $window, $location, $timeout) {

    $scope.commentsList = [];
    $scope.isLoading = false;

    $scope.emailsearch ="";

    $scope.$watch('emailsearch', function(newValue,oldValue) {
        if (!oldValue) {
            //bookmark = $scope.query.page;
        }

        if (newValue !== oldValue) {
          //  $scope.query.page = newValue.page;
        }

        if (!newValue) {
           // $scope.query.page = bookmark;
        }

        $scope.getUsers();
      },false);

    $scope.getUsers = function () {
        $scope.isLoading = true;
        $timeout(function () {
            $http.get("https://jsonplaceholder.typicode.com/comments?email="+$scope.emailsearch).then(function success(response) {
                $scope.commentsList = response.data
                $scope.isLoading = !$scope.isLoading;
            }, function error(error) {
                if (error.status == -1) {
                    $scope.isLoading = false;
                }
                $window.location.href = '/error.html';
            });

        }, 1000);


    }

    $scope.getUsers();



});
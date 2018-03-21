(function () {
    'use strict';
    var app = angular.module("onlineApp", [

    ]);

    app.controller("UserController", function ($scope, $log, $http, $window, $location, $timeout) {

        $scope.commentsList = [];
        $scope.isLoading = false;
        $scope.selectedCssClass = 'selected-row-section';
        $scope.selectedTrainStations = {};
        $scope.userdetails = {};
        $scope.isDisplay = false;


        $scope.query = {
            limit: 50,
            emailsearch: ''
        }
        $scope.rowClicked = function (indexNumber, userdetails) {
            if ($scope.selectedTrainStations[indexNumber]
                && $scope.selectedTrainStations[indexNumber].cssClass) {
                $scope.removeTrainStationSelectedList(indexNumber);
            } else {
                $scope.addTrainStationSelectedList(indexNumber);
            }
            $scope.isDisplay  = !$scope.isDisplay;
            $scope.userdetails = userdetails;
        }

        $scope.addTrainStationSelectedList = function (stopNumber) {
            $scope.selectedTrainStations[stopNumber] = {
                data: 150,
                cssClass: $scope.selectedCssClass
            };
        }

        $scope.removeTrainStationSelectedList = function (stopNumber) {
            delete $scope.selectedTrainStations[stopNumber];
        };

        $scope.$watch('query', function (newValue, oldValue) {
            if (!oldValue) {
                //bookmark = $scope.query.page;
                console.log(oldValue);
            }
            if (newValue == '') {
                $scope.getUsers();
            }
            if (newValue !== oldValue) {
                //  $scope.query.page = newValue.page;
                $scope.searchUsers();
                //   $scope.isLoading = false;

            }
            if (!newValue) {
                // $scope.query.page = bookmark;

                console.log(newValue);

            }
            // $scope.getUsers();
            // $scope.searchUsers();
            $scope.getUsers();
            //$scope.isLoading = false;
        }, true);

        $scope.getUsers = function () {
            //  $scope.isLoading = true;
            $http.get("https://jsonplaceholder.typicode.com/comments").then(function success(response) {
                $scope.commentsList = response.data
                //$scope.isLoading = !$scope.isLoading;

            }, function error(error) {
                if (error.status == -1) {
                    ///  $scope.isLoading = false;
                }
                // $window.location.href = '/error.html';
            });
        }
        $scope.getUsers();

        $scope.searchUsers = function () {
            $scope.isLoading = true;
            $http.get("https://jsonplaceholder.typicode.com/comments?email=" + $scope.query.emailsearch).then(function success(response) {
                $scope.commentsList = response.data
                $scope.isLoading = !$scope.isLoading;
            }, function error(error) {
                if (error.status == -1) {
                    $scope.isLoading = false;
                }
                $window.location.href = '/error.html';
            });

        }
    });


})();
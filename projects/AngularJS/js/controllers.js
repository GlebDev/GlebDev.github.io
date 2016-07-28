 'use strict'
//
// Controllers

var phonecatApp = angular.module('phonecatApp',[]);

phonecatApp.controller("PhoneListCtrl",function($scope,$http){
    $http.get('phones/phones.json').success(function(data,status,headers,config){
        console.log('This is Data:',data,'\n\n This is Status:',status,'\n\n This is Headers:',headers,'\n\n This is Config:',config);
        $scope.phones = data;
    }).error(function(){

    });
    $scope.title = "Phones";
    var date = new Date();
    $scope.today = date;
    $scope.doneAndFilter = function(phoneItem) {
        return phoneItem.name && phoneItem.priority > 1 && phoneItem.status === true;
    }
    $scope.sortField = undefined;
    $scope.reverse = false;

    $scope.sort = function(fieldName){
        if($scope.sortField === fieldName){
            $scope.reverse = !$scope.reverse;
        } else {
            $scope.sortField = fieldName;
            $scope.reverse = !$scope.reverse;
        }
    };
    $scope.isSortUp = function(fieldName){
        return $scope.sortField === fieldName && !$scope.reverse;
    };
    $scope.isSortDown = function(fieldName){
        return $scope.sortField === fieldName && $scope.reverse;
    };
});

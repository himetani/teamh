'use strict';

angular.module('teamhApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/route/addTask/addTask.html',
        controller: 'AddtaskCtrl'
      });
  });

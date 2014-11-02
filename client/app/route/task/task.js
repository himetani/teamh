'use strict';

angular.module('teamhApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/task', {
        templateUrl: 'app/route/task/task.html',
        controller: 'TaskCtrl'
      });
  });

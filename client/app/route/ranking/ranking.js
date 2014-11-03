'use strict';

angular.module('teamhApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ranking', {
        templateUrl: 'app/route/ranking/ranking.html',
        controller: 'RankingCtrl'
      });
  });

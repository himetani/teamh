'use strict';

angular.module('teamhApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'app/directive/navbar/navbar.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
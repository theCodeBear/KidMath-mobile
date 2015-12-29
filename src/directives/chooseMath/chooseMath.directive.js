'use strict';

angular.module('kidmath')

.directive('kmMaths', kmMaths);

function kmMaths() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'directives/chooseMath/chooseMath.template.html'
  };
}
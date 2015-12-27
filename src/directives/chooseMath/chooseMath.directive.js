'use strict';

angular.module('kidmath')

.directive('kmMaths', kmMaths);

kmMaths.$inject = [];
function kmMaths() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'directives/chooseMath/chooseMath.template.html'
  };
}
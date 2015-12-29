'use strict';

angular.module('kidmath')

.directive('kmLogin', kmLogin);

function kmLogin() {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'directives/login/login.template.html'
  };
}
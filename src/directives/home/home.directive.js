'use strict';

angular.module('kidmath')

.directive('kmHome', kmHome);


kmHome.$inject = [];
function kmHome() {
  return {
    restrict: 'E',
    bindToController: true,
    scope: {},
    controller: kmHomeCtrl,
    controllerAs: 'vmHome',
    templateUrl: 'directives/home/home.template.html'
  };
}

function kmHomeCtrl() {
  let vmHome = this;
}
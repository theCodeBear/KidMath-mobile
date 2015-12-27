'use strict';

angular.module('kidmath')

.directive('kmDisplayProblem', kmDisplayProblem);

kmDisplayProblem.$inject = [];
function kmDisplayProblem() {
  return {
    restrict: 'E',
    bindToController: true,
    scope: {},
    controller: kmDisplayProblemCtrl,
    controllerAs: 'vmDisplayProblem',
    templateUrl: 'directives/displayProblem/displayProblem.template.html'
  };
}

function kmDisplayProblemCtrl() {
  let vmDisplayProblem = this;
}
'use strict';

angular.module('kidmath')

.directive('kmDisplayProblem', kmDisplayProblem);

function kmDisplayProblem() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      operator: '=',
      level: '='
    },
    controller: kmDisplayProblemCtrl,
    controllerAs: 'vmDisplayProblem',
    templateUrl: 'directives/displayProblem/displayProblem.template.html'
  };
}

kmDisplayProblemCtrl.$inject = ['$scope', 'MathProblem'];
function kmDisplayProblemCtrl($scope, MathProblem) {
  let vmDisplayProblem = this;
  vmDisplayProblem.problem = MathProblem.createProblem(vmDisplayProblem.operator, vmDisplayProblem.level);

  $scope.$on('correct answer', () => {
    vmDisplayProblem.problem = MathProblem.createProblem(vmDisplayProblem.operator, vmDisplayProblem.level);
  });
}
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

  displayProblem(vmDisplayProblem.operator, vmDisplayProblem.level);

  $scope.$on('correct answer', () => {
    displayProblem(vmDisplayProblem.operator, vmDisplayProblem.level);
  });

  function displayProblem(operator, level) {
    vmDisplayProblem.problem = MathProblem.createProblem(operator, level);
    vmDisplayProblem.operandLength = vmDisplayProblem.problem.operands.length;
  }
}
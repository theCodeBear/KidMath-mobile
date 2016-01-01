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

  let randomizeLevel = vmDisplayProblem.level ? false : true;
  vmDisplayProblem.level = returnLevel(vmDisplayProblem.level, randomizeLevel);
  displayProblem(vmDisplayProblem.operator, returnLevel(vmDisplayProblem.level, randomizeLevel));//vmDisplayProblem.level);

  $scope.$on('correct answer', () => {
    displayProblem(vmDisplayProblem.operator, returnLevel(vmDisplayProblem.level, randomizeLevel)); //vmDisplayProblem.level);
  });

  function displayProblem(operator, level) {
    vmDisplayProblem.problem = MathProblem.createProblem(operator, level);
    vmDisplayProblem.operandLength = vmDisplayProblem.problem.operands.length;
  }

  function returnLevel(level, randomize) {
    if (randomize) {
      return Math.ceil(Math.random() * 7).toString();
    } else return level;
  }
}
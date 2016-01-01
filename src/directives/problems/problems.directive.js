'use strict';

angular.module('kidmath')

.directive('kmProblems', kmProblems);


function kmProblems() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {},
    controller: kmProblemsCtrl,
    controllerAs: 'vmProblems',
    templateUrl: 'directives/problems/problems.template.html'
  };
}

kmProblemsCtrl.$inject = ['$stateParams', 'Utility'];
function kmProblemsCtrl($stateParams, Utility) {
  let vmProblems = this;

  vmProblems.mathOperand = Utility.chooseOperand($stateParams.type);
  vmProblems.level = $stateParams.level;
  vmProblems.decimalOrRemainder = Utility.decimalOrRemainder(vmProblems.level, $stateParams.type);
}
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

kmProblemsCtrl.$inject = ['$stateParams'];
function kmProblemsCtrl($stateParams) {
  let vmProblems = this;

  vmProblems.mathOperand = chooseOperand($stateParams.type);
  vmProblems.level = $stateParams.level;
  vmProblems.decimalOrRemainder = decimalOrRemainder(vmProblems.level, $stateParams.type);

  function chooseOperand(type) {
    switch(type) {
      case 'addition':        return '+';
      case 'subtraction':     return '&#8722;';
      case 'multiplication':  return '&#215;';
      case 'division':        return '&#247;';
      case 'arithmetic':      return ['+', '&#8722;', '&#215;', '&#247;'];
      default:                throw new Error('problem type did not match defined types');
    }
  }

  // in the future I'll add problem types that use decimal points
  function decimalOrRemainder(level, type) {
    if (type === 'decimal') return decimal;
    else return 'remainder';
  }

}
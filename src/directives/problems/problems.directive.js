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

  vmProblems.mathType = chooseOperand($stateParams.type);
  vmProblems.level = $stateParams.level;
}

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
'use strict';

angular.module('kidmath')

.directive('kmTimedQuiz', kmTimedQuiz);

function kmTimedQuiz() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {},
    controller: kmTimedQuizCtrl,
    controllerAs: 'vmTimedQuiz',
    templateUrl: 'directives/timedQuiz/timedQuiz.template.html'
  };
}


kmTimedQuizCtrl.$inject = ['$stateParams'];
function kmTimedQuizCtrl($stateParams) {
  let vmTimedQuiz = this;

  vmTimedQuiz.mathOperand = chooseOperand($stateParams.type);
  vmTimedQuiz.decimalOrRemainder = decimalOrRemainder(vmTimedQuiz.level, $stateParams.type);


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
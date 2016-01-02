'use strict';

angular.module('kidmath')

.directive('kmKeypad', kmKeypad);


function kmKeypad() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      decimalOrRemainder: '='
    },
    controller: kmKeypadCtrl,
    controllerAs: 'vmKeypad',
    templateUrl: 'directives/keypad/keypad.template.html'
  };
}

kmKeypadCtrl.$inject = ['$rootScope', 'MathProblem'];
function kmKeypadCtrl($rootScope, MathProblem) {
  let vmKeypad = this;

  vmKeypad.answer = '0';
  vmKeypad.updateAnswer = updateAnswer;
  vmKeypad.backspace = backspace;
  vmKeypad.reset = () => vmKeypad.answer = '0';
  vmKeypad.checkAnswer = checkAnswer;

  function updateAnswer(input) {
    if (input === '-' && vmKeypad.answer[0] !== '-') vmKeypad.answer = '-'.concat(vmKeypad.answer);
    else if (input === '-') vmKeypad.answer = vmKeypad.answer.slice(1);
    else if (vmKeypad.answer === '0' && (input !== '.' && input !== ' r ')) vmKeypad.answer = input.toString();
    else if (input === '.' && vmKeypad.answer.indexOf('.') !== -1) return;
    else if (input === '.' && (vmKeypad.answer === '0' || vmKeypad.answer === '-0')) vmKeypad.answer += '.';
    else if (input === ' r ' && vmKeypad.answer.indexOf('r') !== -1) return;
    else if (input === ' r ' && (vmKeypad.answer === '0' || vmKeypad.answer === '-0')) vmKeypad.answer += ' r ';
    else if (vmKeypad.answer[0] === '-' && vmKeypad.answer[1] === '0' && vmKeypad.answer.indexOf('.') === -1) vmKeypad.answer = '-'.concat(input);
    else vmKeypad.answer += input;
  }

  function backspace() {
    if (vmKeypad.answer === '0' || vmKeypad.answer === '-1') vmKeypad.answer = '0';
    else if (vmKeypad.answer.length === 1 || (vmKeypad.answer.length === 2 && vmKeypad.answer[0] === '-')) vmKeypad.answer = '0';
    else if (vmKeypad.answer.slice(-3) === ' r ') vmKeypad.answer = vmKeypad.answer.slice(0,-3);
    else vmKeypad.answer = vmKeypad.answer.slice(0,-1);
  }

  function checkAnswer(answer) {
    if (MathProblem.checkAnswer(answer)) {
      vmKeypad.reset();
      $rootScope.$broadcast('correct answer');
    } else {
      $rootScope.$broadcast('wrong answer');
    }
  }
}
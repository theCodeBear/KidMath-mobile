'use strict';

angular.module('kidmath')

.directive('kmKeypad', kmKeypad);


kmKeypad.$inject = [];
function kmKeypad() {
  return {
    restrict: 'E',
    bindToController: true,
    scope: {},
    controller: kmKeypadCtrl,
    controllerAs: 'vmKeypad',
    templateUrl: 'directives/keypad/keypad.template.html'
  };
}


function kmKeypadCtrl() {
  let vmKeypad = this;

  vmKeypad.answer = '0';
  vmKeypad.updateAnswer = updateAnswer;
  vmKeypad.backspace = backspace;
  vmKeypad.reset = () => vmKeypad.answer = '0';

  function updateAnswer(input) {
    if (input === '-' && vmKeypad.answer === '0') vmKeypad.answer = '-'.concat(vmKeypad.answer);
    else if (input === '-') vmKeypad.answer = (vmKeypad.answer * -1).toString();
    else if (vmKeypad.answer === '0' && input !== '.') vmKeypad.answer = input.toString();
    else if (input === '.' && vmKeypad.answer.indexOf('.') !== -1) return;
    else if (input === '.' && (vmKeypad.answer === '0' || vmKeypad.answer === '-0')) vmKeypad.answer += '.';
    else if (vmKeypad.answer[0] === '-' && vmKeypad.answer[1] === '0' && vmKeypad.answer.indexOf('.') === -1) vmKeypad.answer = '-'.concat(input);
    else vmKeypad.answer += input;
  }

  function backspace() {
    if (vmKeypad.answer === '0' || vmKeypad.answer === '-1') vmKeypad.answer = '0';
    else if (vmKeypad.answer.length === 1 || (vmKeypad.answer.length === 2 && vmKeypad.answer[0] === '-')) vmKeypad.answer = '0';
    else vmKeypad.answer = vmKeypad.answer.slice(0,-1);
  }
}
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

  vmKeypad.answer = '';
  vmKeypad.updateAnswer = updateAnswer;
  vmKeypad.backspace = () => vmKeypad.answer = vmKeypad.answer.slice(0,-1);

  function updateAnswer(input) {
    if (input === '-') vmKeypad.answer = (vmKeypad.answer * -1).toString();
    else if (input === '.' && vmKeypad.answer.indexOf('.') !== -1) return;
    else if (input === '.' && vmKeypad.answer === '') vmKeypad.answer += '0.';
    else vmKeypad.answer += input;
  }
}
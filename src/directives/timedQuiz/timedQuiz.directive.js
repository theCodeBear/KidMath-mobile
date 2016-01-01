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


kmTimedQuizCtrl.$inject = ['$stateParams', 'Utility'];
function kmTimedQuizCtrl($stateParams, Utility) {
  let vmTimedQuiz = this;

  vmTimedQuiz.mathOperand = Utility.chooseOperand($stateParams.type);
  vmTimedQuiz.decimalOrRemainder = Utility.decimalOrRemainder(vmTimedQuiz.level, $stateParams.type);
}
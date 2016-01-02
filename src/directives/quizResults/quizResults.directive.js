'use strict';

angular.module('kidmath')

.directive('kmQuizResults', kmQuizResults);

function kmQuizResults() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {},
    controller: kmQuizResultsCtrl,
    controllerAs: 'vmQuizResults',
    templateUrl: 'directives/quizResults/quizResults.template.html'
  };
}

kmQuizResultsCtrl.$inject = ['Score'];
function kmQuizResultsCtrl(Score) {
  let vmQuizResults = this;

  vmQuizResults.score = Score.getScore(true);
}
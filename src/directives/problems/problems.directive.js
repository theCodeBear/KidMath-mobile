'use strict';

angular.module('kidmath')

.directive('kmProblems', kmProblems);


function kmProblems($stateParams) {
  return {
    restrict: 'E',
    bindToController: true,
    scope: {
      yo: '='
    },
    controller: kmProblemsCtrl,
    controllerAs: 'vmProblems',
    templateUrl: 'directives/problems/problems.template.html'
  };
}

kmProblemsCtrl.$inject = ['$stateParams'];
function kmProblemsCtrl($stateParams) {
  let vmProblems = this;
  console.log('vm', vmProblems)
  console.log($stateParams.type)
  console.log($stateParams.level)
  console.log($stateParams)
}
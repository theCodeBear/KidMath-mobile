'use strict';

angular.module('kidmath')

.directive('kmProblemCounter', kmProblemCounter);

function kmProblemCounter($state) {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      resultType: '@type'
    },
    controller: kmProblemCounterCtrl,
    controllerAs: 'vmProblemCounter',
    templateUrl: 'directives/problemCounter/problemCounter.template.html'
  };
}

kmProblemCounterCtrl.$inject = ['$scope', '$state', '$rootScope'];
function kmProblemCounterCtrl($scope, $state, $rootScope) {
  let vmProblemCounter = this;

  vmProblemCounter.correct = {count: 0};
  vmProblemCounter.wrong = {count: 0};
  vmProblemCounter.stateName = $state.current.name;

  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    vmProblemCounter.stateName = toState.name;
    vmProblemCounter.correct.count = 0;
    vmProblemCounter.wrong.count = 0;
  });

  $scope.$on('correct answer', () => vmProblemCounter.correct.count++);
  $scope.$on('wrong answer', () => vmProblemCounter.wrong.count++)
}
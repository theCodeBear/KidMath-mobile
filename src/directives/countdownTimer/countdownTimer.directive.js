'use strict';

angular.module('kidmath')

.directive('kmTimer', kmTimer);

function kmTimer() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {
      seconds: '@'
    },
    controller: kmTimerCtrl,
    controllerAs: 'vmTimer',
    templateUrl: 'directives/countdownTimer/countdownTimer.template.html'
  };
}

kmTimerCtrl.$inject = ['$rootScope', '$interval', '$state'];
function kmTimerCtrl($rootScope, $interval, $state) {
  let vmTimer = this;

  let intervalTimer;
  let finished = false;
  vmTimer.tick = vmTimer.seconds;
  vmTimer.stateName = $state.current.name;

  if (vmTimer.stateName === 'app.timedQuiz') startCountdown();

  $rootScope.$on('$stateChangeSuccess', (e, toState, toParams, fromState) => {
    vmTimer.stateName = toState.name;
    if (vmTimer.stateName === 'app.timedQuiz') startCountdown();
    if (fromState.name === 'app.timedQuiz' && toState.name !== 'app.quizResults') {
      finished = endQuiz(finished);
    }
  });


  function startCountdown() {
    let start = new Date().getTime();
    let elapsedSecs = 0, elapsedMillis = 0;
    intervalTimer = $interval(() => {
      if (vmTimer.tick === 0) {
        finished = endQuiz(finished = true);
      } else {
        elapsedMillis = new Date().getTime() - start;
        elapsedSecs = Math.floor(elapsedMillis/1000);
        vmTimer.tick = vmTimer.seconds - elapsedSecs;
      }
    });
  }

  function endQuiz(finished) {
    if (finished) {
      vmTimer.tick = vmTimer.seconds;
      $state.go('app.quizResults');
    } else ;//mark in stats that quiz wasn't finished
    $interval.cancel(intervalTimer);
    return false;
  }
}
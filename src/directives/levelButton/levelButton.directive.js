'use strict';

angular.module('kidmath')

.directive('kmLevelButton', kmLevelButton);


function kmLevelButton() {
  return {
    restrict: 'E',
    scope: {},
    bindToController: {},
    controller: kmLevelButtonCtrl,
    controllerAs: 'vmLevelButton',
    templateUrl: 'directives/levelButton/levelButton.template.html'
  };
}

kmLevelButtonCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPopup'];
function kmLevelButtonCtrl($rootScope, $scope, $state, $ionicPopup) {
  let vmLevelButton = this;

  let iconText = '<i class="icon ion-ios-clock-outline adjust-clock"></i>';
  vmLevelButton.stateName = $state.current.name;
  vmLevelButton.level = $state.params.level || iconText;
  vmLevelButton.showPopup = showPopup;

  let levelButtons = [];
  for (let i=0; i<7; i++) {
    levelButtons.push({
      text: `Level ${i+1}`,
      type: 'button button-positive level-popup-buttons',
      onTap(e) {
        $state.go('app.problems', { type: $state.params.type, level: i+1 });
      }
    });
  }
  levelButtons.push({
    text: iconText,
    type: 'button button-positive level-popup-buttons',
    onTap(e) {
      $state.go('app.timedQuiz', { type: $state.params.type });
    }
  });

  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams) => {
    vmLevelButton.stateName = toState.name;
    vmLevelButton.level = toParams.level || iconText;
  });

  function showPopup() {
    let myPopup = $ionicPopup.show({
      title: 'Choose Difficulty Level',
      scope: $scope,
      buttons: levelButtons
    });
  }
}
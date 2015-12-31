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

  vmLevelButton.stateName = $state.current.name;
  vmLevelButton.level = $state.params.level;
  vmLevelButton.showPopup = showPopup;
  let levelButtons = [];
  for (let i=0; i<7; i++) {
    levelButtons.push({
      text: `Level ${i+1}`,
      type: 'button-positive level-popup-buttons',
      onTap(e) {
        $state.go('app.problems', { type: $state.params.type, level: i+1 });
      }
    });
  }

  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams) => {
    vmLevelButton.stateName = toState.name;
    vmLevelButton.level = toParams.level;
  });

  function showPopup() {
    let myPopup = $ionicPopup.show({
      title: 'Choose Difficulty Level',
      scope: $scope,
      buttons: levelButtons
    });
  }
}
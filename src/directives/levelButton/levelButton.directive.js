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
    link: link,
    templateUrl: 'directives/levelButton/levelButton.template.html'
  };
}

function link(scope, elem, attrs) {
  elem.bind('click', (e) => {
    alert('clicked')
  });
}

kmLevelButtonCtrl.$inject = ['$rootScope', '$state'];
function kmLevelButtonCtrl($rootScope, $state) {
  let vmLevelButton = this;

  vmLevelButton.stateName = $state.current.name;
  vmLevelButton.level = $state.params.level;

  $rootScope.$on('$stateChangeSuccess', (event, toState, toParams) => {
    vmLevelButton.stateName = toState.name;
    vmLevelButton.level = toParams.level;
  });
}
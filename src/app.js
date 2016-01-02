// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('kidmath', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    template: '<km-login></km-login>'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'menu.html',
  })

  .state('app.maths', {
    url: '/maths',
    views: {
      'menuContent': {
        template: '<km-maths></km-maths>'
      }
    }
  })

  .state('app.problems', {
    url: '/problems/:type/:level',
    views: {
      'menuContent': {
        template: '<km-problems></km-problems>'
      }
    }
  })

  .state('app.timedQuiz', {
    url: '/quiz/:type',
    views: {
      'menuContent': {
        template: '<km-timed-quiz></km-timed-quiz>'
      }
    }
  })

  .state('app.quizResults', {
    url: '/quiz-resuts',
    views: {
      'menuContent': {
        template: '<km-quiz-results></km-quiz-results>'
      }
    },
    cache: false
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

angular.module('app')

.config(function($stateProvider, $urlRouterProvider, $authProvider, APIserver) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $authProvider.loginUrl = APIserver + "/api/authenticate";
  $authProvider.signupUrl = APIserver + "/registration";

  // debugger;

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('user', {
    url: '/user',
    templateUrl: 'templates/user.html',
    controller: 'userCtrl'
  })

  .state('admin', {
    url: '/admin',
    templateUrl: 'templates/admin.html',
    controller: 'adminCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

$urlRouterProvider.otherwise('/login')



});

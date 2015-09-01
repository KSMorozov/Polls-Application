(function () {
  angular.module('PollsApp')

  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl:  'templates/home.html',
      controller:   'HomeController',
      controllerAs: 'HomeCtrl'
    })
    .when('/api/signup', {
      templateUrl:  'templates/signup.html',
      controller:   'SignupController',
      controllerAs: 'SignupCtrl'
    })
    .when('/api/login', {
      templateUrl:  'templates/login.html',
      controller:   'LoginController',
      controllerAs: 'LoginCtrl'
    });

    $locationProvider.html5Mode(true);
  });
})();

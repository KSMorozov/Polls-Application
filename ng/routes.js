(function () {
  angular.module('PollsApp')
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
    .state('home',  {
      url          : '/',
      templateUrl  : 'templates/home.html',
      controller   : 'HomeController',
      controllerAs : 'HomeCtrl'
    })
    .state('login', {
      url          : '/login',
      templateUrl  : 'templates/login.html',
      controller   : 'LoginController',
      controllerAs : 'LoginCtrl',
      resolve      : {
        skipIfLoggedIn : skipIfLoggedIn
      }
    })
    .state('signup', {
      url          : '/signup',
      templateUrl  : 'templates/signup.html',
      controller   : 'SignupController',
      controllerAs : 'SignupCtrl',
      resolve      : {
        skipIfLoggedIn : skipIfLoggedIn
      }
    })
    .state('logout', {
      url          : '/logout',
      template     :  null,
      controller   : 'LogoutController',
      controllerAs : 'LogoutCtrl'
    })
    .state('polls', {
      url          : '/polls',
      templateUrl  : 'templates/polls.html',
      controller   : 'PollsController',
      controllerAs : 'PollsCtrl',
      resolve      : {
        loginRequired : loginRequired
      }
    })
    .state('new',  {
      url          : '/new',
      templateUrl  : 'templates/new.html',
      controller   : 'NewController',
      controllerAs : 'NewCtrl',
      resolve      : {
        loginRequired : loginRequired
      }
    })
    .state('poll', {
      url          : '/:_id',
      templateUrl  : 'templates/poll.html',
      controller   : 'PollController',
      controllerAs : 'PollCtrl'
    })
    .state('delete', {
      url          : '/:_id/delete',
      template     : null,
      controller   : 'DeleteController',
      controllerAs : 'DeleteCtrl',
      resolve      : {
        loginRequired : loginRequired
      }
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) deferred.reject();
      else                         deferred.resolve();
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) deferred.resolve();
      else                         $location.path('/login');
      return deferred.promise;
    }
  });
})();

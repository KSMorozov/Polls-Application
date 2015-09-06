(function () {
  angular.module('PollsApp', ['ngResource',
                              'ngMessages',
                              'ngAnimate',
                              'toaster',
                              'ui.router',
                              'satellizer',
                              'ngMaterial',
                              'ngMdIcons']);
})();

(function () {
  angular.module('PollsApp')
  .factory('Account', function ($http) {
    return {
      getProfile : function () {
        return $http.get('/api/me');
      }
    };
  });
})();

(function () {
  angular.module('PollsApp')
  .controller('ApplicationController', function ($scope, $auth, Account) {
    var self = this;

    self.isLoggedIn = function () {
      return $auth.isAuthenticated();
    };

    self.getProfile = function () {
      Account.getProfile()
      .then(function (res) {
        self.activeUser = res.data.username;
      });
    };

    $scope.$on('change', function () {
      if ($auth.isAuthenticated()) self.getProfile();
    });

    if ($auth.isAuthenticated()) self.getProfile();
  });
})();

(function () {
  angular.module('PollsApp')
  .controller('HomeController', function ($scope, $auth, $location) {
    var self = this;

    self.isLoggedIn = function () {
      return $auth.isAuthenticated();
    };

    self.message = 'Home';
  });
})();

(function () {
  angular.module('PollsApp')
  .controller('LoginController', function ($scope, $location, $auth, toaster) {
    var self = this;

    self.login = function () {
      $auth.login({
        username : self.username,
        password : self.password
      })
      .then(function () {
        $scope.$emit('change');
        toaster.success('Login', 'You have successfully signed in.');
        $location.path('/');
      })
      .catch(function (res) {
        toaster.error('Login', 'You have not signed in ' + res.statusText);
      });
    };

    self.message = 'Login';
  });
})();

(function () {
  angular.module('PollsApp')
  .controller('LogoutController', function ($scope, $location, $auth, toaster) {
    if (!$auth.isAuthenticated()) return ;
    $auth.logout()
    .then(function () {
      $scope.$emit('change');
      toaster.info('Logout', 'You have successfully logged out');
      // why the fuck it works only with double slash AYY LMAO !?
      $location.path('//');
    });
  });
})();

(function () {
  angular.module('PollsApp')

  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('purple')
      .accentPalette('deep-purple');
  });
})();

(function () {
  angular.module('PollsApp')
  .controller('PollsController', function () {
    var self = this;

    self.message = 'Polls Controller';
  });
})();

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

(function () {
  angular.module('PollsApp')
  .controller('SignupController', function ($scope, $location, $auth, toaster) {
    var self = this;

    self.signup = function () {
      $auth.signup({
        username : self.username,
        password : self.password
      })
      .then(function () {
        $location.path('/login');
        toaster.info('Signup', 'You have successfully created a new account');
      })
      .catch(function (res) {
        toaster.error('Signup', 'You have not signed up ' + res.statusText);
      });
    };

    self.message = 'Signup';
  });
})();

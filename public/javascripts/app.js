(function () {
  angular.module('PollsApp', ['ngRoute',
                              'ngMaterial',
                              'ngMdIcons']);
})();

(function () {
  angular.module('PollsApp')
  .controller('ApplicationController', function ($scope, $location, UserService) {
    $scope.$on('login', function (_, user) {
      UserService.setAUser(user.username);
      $scope.activeUser = UserService.getAUser();
    });

    $scope.logout = function () {
      UserService.logout();
      $scope.activeUser = '';
      $location.path('api/login');
    };

    $scope.isLoggedIn = UserService.isLoggedIn;

    $scope.$watch(
      function () {
        return UserService.getAUser();
      },
      function (n, o) {
        $scope.activeUser = n;
      }
    );
  });
})();

(function () {
  angular.module('PollsApp')
  .controller('HomeController', function ($scope, $location) {
    this.message = 'Home Controller';
  });
})();

(function () {
  angular.module('PollsApp')
  .controller('LoginController', function ($scope, $location, UserService) {
    var self = this;

    self.login = function (username, password) {
      UserService.login(self.username, self.password)
      .then(function (res) {
        $scope.$emit('login', res.data);
        $location.path('/');
      }, function (res) {
        self.password = self.username = '';
        self.message = res.status + ' ' + res.data;
      });
    };
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

(function () {
  angular.module('PollsApp')
  .controller('SignupController', function ($scope, $location, UserService) {
    var self = this;

    self.signup = function (username, password) {
      UserService.signup(self.username, self.password)
      .success(function (res) {
        $location.path('/api/login');
      })
      .error(function (res) {
        self.password = self.username = '';
        self.message = res;
      });
    };
  });
})();

(function () {
  angular.module('PollsApp')
  .service('UserService', function ($http, $window) {
    var self = this;

    self.getUser = function () {
      return $http.get('/api/me', {
        headers : {
          'Authorization' : 'Bearer ' + self.getToken()
        }
      });
    };

    self.login = function (username, password) {
      return $http.post('/api/login', {
        username : username,
        password : password
      })
      .then(function (res) {
        // self.token = res.data;
        self.setToken(res.data);
        return self.getUser();
      });
    };

    self.signup = function (username, password) {
      return $http.post('/api/signup', {
        username : username,
        password : password
      });
    };

    self.logout = function () {
      self.setToken();
      self.remAUser();
    };

    self.isLoggedIn = function () {
      return !!self.getToken();
    };

    self.getToken = function () {
      return $window.localStorage.getItem('token');
    };

    self.setToken = function (token) {
      if (token) $window.localStorage.setItem('token', token);
      else       $window.localStorage.removeItem('token');
    };

    self.getAUser = function () {
      return $window.localStorage.getItem('user');
    };

    self.setAUser = function (user) {
      $window.localStorage.setItem('user', user);
    };

    self.remAUser = function () {
      $window.localStorage.removeItem('user');
    };
  });
})();

(function () {
  angular.module('PollsApp', ['ngRoute',
                              'ngMaterial',
                              'ngMdIcons']);
})();

(function () {
  angular.module('PollsApp')
  .controller('ApplicationController', function ($scope) {
    $scope.$on('login', function (_, user) {
      $scope.activeUser = user;
    });
  });
})();

(function () {
  angular.module('PollsApp')
  .controller('HomeController', function ($scope) {
    this.message = 'Home Controller';
  });
})();

(function () {
  angular.module('PollsApp')
  .controller('LoginController', function ($scope, UserService, $location) {
    var self = this;

    self.login = function (username, password) {
      UserService.login(self.username, self.password)
      .then(function (res) {
        console.log(res.data);
        $scope.$emit('login', res.data);
        $location.path('/');
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
  .controller('SignupController', function ($scope) {
    this.message = 'Signup Controller';
  });
})();

(function () {
  angular.module('PollsApp')
  .service('UserService', function ($http) {
    var self = this;

    self.getUser = function () {
      return $http.get('/api/me', {
        headers : {
          'Authorization' : 'Bearer ' + this.token
        }
      });
    };

    self.login = function (username, password) {
      return $http.post('/api/login', {
        username : username,
        password : password
      })
      .then(function (res) {
        self.token = res.data;
        return self.getUser();
      });
    };
  });
})();
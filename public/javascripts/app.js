(function () {
  angular.module('PollsApp', ['ngResource',
                              'ngMessages',
                              'ngAnimate',
                              'toaster',
                              'ui.router',
                              'satellizer',
                              'ngMaterial',
                              'ngMdIcons',
                              'chart.js']);
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
  .factory('Chart', function () {
    return {
      gendata : function (data) {
        var reduced = [[], []];

        data.forEach(function (e) {
          reduced[0].push(e.count);
          reduced[1].push(e.option);
        });

        return {
          data   : reduced[0],
          labels : reduced[1]
        };
      }
    };
  });
})();

(function () {
  angular.module('PollsApp')
  .controller('DeleteController', function ($scope, $location, $auth, toaster, Polls) {
    if (!$auth.isAuthenticated()) return ;

    Polls.deletePoll()
    .then(function () {
      toaster.info('Delete', 'You have successfully Deleted Poll.');
      $location.path('/polls');
    }, function (err) {
      toaster.error('Delete', 'You have failed to Delete Poll.');
    });
  });
})();

(function () {
  angular.module('PollsApp')
  .controller('HomeController', function ($scope, $auth, $location, Polls) {
    var self = this;

    self.isLoggedIn = function () {
      return $auth.isAuthenticated();
    };

    self.getPolls = function () {
      Polls.getPolls()
      .then(function (res) {
        self.poll = res.data[0];
      });
    };

    self.message = 'Home';

    if (self.isLoggedIn()) self.getPolls();
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

/* jshint ignore:start */
(function () {
  angular.module('PollsApp')
  .controller('NewController', function ($scope, $auth, $location, Polls) {
    var self  = this;
    self.subject = '';
    self.options = [{option : '', count : 0}];

    self.isLoggedIn = function () {
      return $auth.isAuthenticated();
    };

    self.addOption  = function () {
      self.options.push({option : '', count : 0});
    };

    self.newPoll    = function () {
      self.options.pop();
      Polls.createPoll({
        subject : self.subject,
        options : self.options
      })
      .then(function (res) {
        console.log('hey', res);
        $location.path(`/${res.data.id}`);
      });
    };
  });
})();
/* jshint ignore:end */

(function () {
  angular.module('PollsApp')
  .controller('PollController', function ($scope, $auth, $location, Polls, Chart) {
    var self = this;
    self.vote   = '';
    self.voteid = '';

    self.pie    = {};

    self.isLoggedIn = function () {
      return $auth.isAuthenticated();
    };

    self.getPoll = function () {
      Polls.getPoll()
      .then(function (res, err) {
        self.poll = res.data;
        self.vote = self.poll.options[0].option;
        self.pie  = Chart.gendata(res.data.options);
      }, function (err) {
        self.errmsg = '404 No Such Poll Exists.';
      });
    };

    self.sendVote = function () {
      self.poll.options.forEach(function (e) {
        if (e.option === self.vote) self.voteid = e._id;
      });
      Polls.updatePoll(self.voteid);
    };

    self.message = 'Poll';
    self.getPoll();
    self.img = 'http://i.ytimg.com/vi/_NXrTujMP50/maxresdefault.jpg';
    self.video = 'https://www.youtube.com/embed/_NXrTujMP50?autoplay=1';
  });
})();

/* jshint ignore:start */
(function () {
  angular.module('PollsApp')
  .factory('Polls', function ($http, $stateParams) {
    return {
      getPolls : function () {
        return $http.get('/api/polls');
      },
      getPoll  : function () {
        return $http.get('/api/polls/' + $stateParams._id);
      },
      updatePoll : function (voteid) {
        return $http.put('/api/polls/' + $stateParams._id + '/' + voteid);
      },
      deletePoll : function () {
        return $http.delete(`/api/polls/${$stateParams._id}/delete`);
      },
      createPoll : function (poll) {
        return $http.post('/api/polls', poll);
      }
    };
  });
})();
/* jshint ignore:end */

(function () {
  angular.module('PollsApp')
  .controller('PollsController', function ($scope, $auth, $location, Polls) {
    var self = this;

    self.isLoggedIn = function () {
      return $auth.isAuthenticated();
    };

    self.getPolls = function () {
      Polls.getPolls()
      .then(function (res) {
        self.polls = res.data;
      });
    };

    self.message = 'Polls';

    if (self.isLoggedIn()) self.getPolls();
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
      controllerAs : 'PollCtrl',
      resolve      : {
        loginRequired : loginRequired
      }
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

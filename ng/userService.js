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

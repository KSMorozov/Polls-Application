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

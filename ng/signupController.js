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

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

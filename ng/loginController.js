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

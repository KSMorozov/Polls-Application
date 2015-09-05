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

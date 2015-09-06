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

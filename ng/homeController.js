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
        console.log(res.data[0]);
      });
    };

    self.message = 'Home';

    if (self.isLoggedIn()) self.getPolls();
  });
})();

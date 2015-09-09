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

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

(function () {
  angular.module('PollsApp')
  .controller('SignupController', function ($scope, $location, $auth, toaster) {
    var self = this;

    self.signup = function () {
      $auth.signup({
        username : self.username,
        password : self.password
      })
      .then(function () {
        $location.path('/login');
        toaster.info('Signup', 'You have successfully created a new account');
      })
      .catch(function (res) {
        toaster.error('Signup', 'You have not signed up ' + res.statusText);
      });
    };
  });
})();

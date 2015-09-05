(function () {
  angular.module('PollsApp')
  .controller('LoginController', function ($scope, $location, $auth, toaster) {
    var self = this;

    self.login = function () {
      $auth.login({
        username : self.username,
        password : self.password
      })
      .then(function () {
        $scope.$emit('change');
        toaster.success('Login', 'You have successfully signed in.');
        $location.path('/');
      })
      .catch(function (res) {
        toaster.error('Login', 'You have not signed in ' + res.statusText);
      });
    };
  });
})();

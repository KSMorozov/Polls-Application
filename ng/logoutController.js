(function () {
  angular.module('PollsApp')
  .controller('LogoutController', function ($scope, $location, $auth, toaster) {
    if (!$auth.isAuthenticated()) return ;
    $auth.logout()
    .then(function () {
      toaster.info('Logout', 'You have successfully logged out');
      $location.path('/');
    });
  });
})();

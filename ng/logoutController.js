(function () {
  angular.module('PollsApp')
  .controller('LogoutController', function ($scope, $location, $auth, toaster) {
    if (!$auth.isAuthenticated()) return ;
    $auth.logout()
    .then(function () {
      $scope.$emit('change');
      toaster.info('Logout', 'You have successfully logged out');
      // why the fuck it works only with double slash AYY LMAO !?
      $location.path('//');
    });
  });
})();

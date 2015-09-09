(function () {
  angular.module('PollsApp')
  .controller('DeleteController', function ($scope, $location, $auth, toaster, Polls) {
    if (!$auth.isAuthenticated()) return ;

    Polls.deletePoll()
    .then(function () {
      toaster.info('Delete', 'You have successfully Deleted Poll.');
      $location.path('/polls');
    }, function (err) {
      toaster.error('Delete', 'You have failed to Delete Poll.');
    });
  });
})();

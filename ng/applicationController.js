(function () {
  angular.module('PollsApp')
  .controller('ApplicationController', function ($scope) {
    $scope.$on('login', function (_, user) {
      $scope.activeUser = user;
    });
  });
})();

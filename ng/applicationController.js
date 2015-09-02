(function () {
  angular.module('PollsApp')
  .controller('ApplicationController', function ($scope, $location, UserService) {
    $scope.$on('login', function (_, user) {
      UserService.setAUser(user.username);
      $scope.activeUser = UserService.getAUser();
    });

    $scope.logout = function () {
      UserService.logout();
      $scope.activeUser = '';
      $location.path('api/login');
    };

    $scope.isLoggedIn = UserService.isLoggedIn;

    $scope.$watch(
      function () {
        return UserService.getAUser();
      },
      function (n, o) {
        $scope.activeUser = n;
      }
    );
  });
})();

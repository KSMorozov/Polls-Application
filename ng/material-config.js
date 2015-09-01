(function () {
  angular.module('PollsApp')

  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('purple')
      .accentPalette('deep-purple');
  });
})();

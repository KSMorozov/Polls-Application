angular.module('PollsApp', ['ngMaterial', 'ngMdIcons']);

angular.module('PollsApp')
.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('purple')
    .accentPalette('deep-purple');
});

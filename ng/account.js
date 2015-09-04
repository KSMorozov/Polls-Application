(function () {
  angular.module('PollsApp')
  .factory('Account', function ($http) {
    return {
      getProfile : function () {
        return $http.get('/api/me');
      }
    };
  });
})();

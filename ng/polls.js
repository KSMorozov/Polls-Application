(function () {
  angular.module('PollsApp')
  .factory('Polls', function ($http, $stateParams) {
    return {
      getPolls : function () {
        return $http.get('/api/polls');
      },
      getPoll  : function () {
        return $http.get('/api/polls/' + $stateParams._id);
      },
      updatePoll : function (voteid) {
        return $http.put('/api/polls/' + $stateParams._id + '/' + voteid);
      }
    };
  });
})();

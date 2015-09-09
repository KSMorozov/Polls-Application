/* jshint ignore:start */
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
      },
      deletePoll : function () {
        return $http.delete(`/api/polls/${$stateParams._id}/delete`);
      },
      createPoll : function (poll) {
        return $http.post('/api/polls', poll);
      }
    };
  });
})();
/* jshint ignore:end */

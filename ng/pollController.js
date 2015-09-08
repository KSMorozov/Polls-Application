(function () {
  angular.module('PollsApp')
  .controller('PollController', function ($scope, $auth, $location, Polls, Chart) {
    var self = this;
    self.vote   = '';
    self.voteid = '';

    self.pie    = {};

    self.isLoggedIn = function () {
      return $auth.isAuthenticated();
    };

    self.getPoll = function () {
      Polls.getPoll()
      .then(function (res, err) {
        self.poll = res.data;
        self.vote = self.poll.options[0].option;
        self.pie  = Chart.gendata(res.data.options);
      }, function (err) {
        self.errmsg = 'No Such Poll Exists.';
      });
    };

    self.sendVote = function () {
      self.poll.options.forEach(function (e) {
        if (e.option === self.vote) self.voteid = e._id;
      });
      Polls.updatePoll(self.voteid);
    };

    self.message = 'Poll';
    self.getPoll();
    self.img = 'http://i.ytimg.com/vi/_NXrTujMP50/maxresdefault.jpg';
    self.video = 'https://www.youtube.com/embed/_NXrTujMP50?autoplay=1';
  });
})();

var Poll = require('../../models/poll');

module.exports = {
  post : function (req, res) {
    var poll = new Poll({
      owner   : req.user._id,
      subject : req.body.subject,
      options : req.body.options
    });

    poll.save(function (err) {
      if (err) res.send(err);
      res.json({
        message : 'New Poll Created!'
      });
    });
  },
  get  : function (req, res) {
    Poll.find({ owner: req.user._id }, function (err, polls) {
      if (err) res.send(err);
      res.json(polls);
    });
  }
};

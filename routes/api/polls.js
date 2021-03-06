var Poll = require('../../models/poll');

module.exports = {
  post   : function (req, res) {
    var poll = new Poll({
      owner   : req.user._id,
      subject : req.body.subject,
      options : req.body.options
    });

    poll.save(function (err) {
      if (err) res.send(err);
      res.json({
        message : 'New Poll Created!',
        id      : poll._id
      });
    });
  },
  get    : function (req, res) {
    Poll.find({ owner: req.user._id })
    .sort('-created')
    .exec(function (err, polls) {
      if (err) return res.send(err);
      res.json(polls);
    });
  },
  getone : function (req, res) {
    Poll.findOne({ _id : req.params._id}, function (err, poll) {
      if (err) return res.sendStatus(400);
      res.json(poll);
    });
  },
  update : function (req, res) {
    Poll.update({'options._id' : req.params._vid}, {
      '$inc' : {
        'options.$.count' : 1
      }
    }, function (err, data) {
      if (err) return res.send(err);
    });
  },
  delete : function (req, res) {
    Poll.findById(req.params._id, function (err, poll) {
      if (err) return next(err);
      if (!poll) return res.sendStatus(404);
      if (poll.owner.equals(req.user._id)) {
        poll.remove(function (err) {
          if (err) return next(err);
          return res.send(204);
        });
      } else {
        return res.sendStatus(505);
      }
    });
  }
};

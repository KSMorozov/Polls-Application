var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var PollSchema = new Schema({
  owner    : {
    type : Schema.Types.ObjectId, ref: 'User',
    required : true
  },
  created : {
    type    : Date,
    default : Date.now
  },
  subject : {
    type : String,
    required : true
  },
  // options : {
  //   type : Array,
  //   required : true
  // },
  options : [{
    option : {
      type     : String,
      required : true
    },
    count  : {
      type     : Number,
      default  : 0
    }
  }]
});

module.exports = mongoose.model('Poll', PollSchema);

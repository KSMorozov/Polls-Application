var mongoose   = require('mongoose');
var bcrypt     = require('bcrypt');
var Schema     = mongoose.Schema;

var UserSchema =  new Schema({
  username : {
    type     : String,
    required : true,
    index    : {
      unique : true
    }
  },
  password : {
    type     : String,
    required : true,
    select   : false
  }
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, callback) {
  var user = this;

  bcrypt.compare(password, user.password, function (err, isValid) {
    if (err) return callback(err);
    callback(null, isValid);
  });
};

module.exports = mongoose.model('User', UserSchema);

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashed_password: { type: Buffer, required: true },
  salt: { type: String, required: true }
});

var User = mongoose.model('User', userSchema);

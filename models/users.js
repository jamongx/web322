const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
  email: {
    type: String,
    index: true,
    unique: true
  },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  clerk: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);




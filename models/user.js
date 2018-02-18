const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  facebook         : {
    id           : String
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
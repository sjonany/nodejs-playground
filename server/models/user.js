const mongoose = require('mongoose');

const ActionItem = new mongoose.Schema({
  priority: Number,
  content: String
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  facebook         : {
    id           : String,
    full_name         : String
  },
  action_items: [ActionItem]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;    
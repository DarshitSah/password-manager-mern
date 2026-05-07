const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  site: String,
  username: String,
  password: String,
}, { timestamps: true });

module.exports = mongoose.model('Password', passwordSchema);
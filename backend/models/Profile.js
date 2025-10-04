const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  firstName: String,
  lastName: String,
  otherEmails: [String],
  contacts: [String], // Initial contacts (phone numbers)
});

module.exports = mongoose.model('Profile', profileSchema);

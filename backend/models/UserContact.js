const mongoose = require('mongoose');

const userContactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  alias: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userContactSchema.index({ userId: 1, contactId: 1 }, { unique: true });

module.exports = mongoose.model('UserContact', userContactSchema);

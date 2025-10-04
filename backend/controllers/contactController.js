const Contact = require('../models/Contact');
const UserContact = require('../models/UserContact');
const { normalizePhone } = require('../utils/phoneUtils');

exports.getContacts = async (req, res) => {
  const userId = req.user.userId;
  const contacts = await UserContact.find({ userId }).populate('contactId');
  res.json(
    contacts.map((c) => ({
      _id: c._id,
      alias: c.alias,
      phoneNumber: c.contactId.phoneNumber,
    }))
  );
};

exports.addContact = async (req, res) => {
  const userId = req.user.userId;
  const { phoneNumber, alias, notes } = req.body;
  const normalizedPhone = normalizePhone(phoneNumber);

  let contact = await Contact.findOne({ normalizedPhone });
  if (!contact) {
    contact = await Contact.create({ phoneNumber, normalizedPhone });
  }

  await UserContact.updateOne(
    { userId, contactId: contact._id },
    {
      $set: { alias, notes, updatedAt: new Date() },
    },
    { upsert: true }
  );

  res.status(201).json({ message: 'Contact added' });
};

exports.searchContacts = async (req, res) => {
  const userId = req.user.userId;
  const q = req.query.q;

  let userContacts;

  if (/^\d+$/.test(q)) {
    const normalized = normalizePhone(q);
    const contact = await Contact.findOne({ normalizedPhone: normalized });
    if (!contact) return res.json([]);
    userContacts = await UserContact.find({ userId, contactId: contact._id }).populate('contactId');
  } else {
    userContacts = await UserContact.find({
      userId,
      alias: { $regex: q, $options: 'i' },
    }).populate('contactId');
  }

  res.json(
    userContacts.map((c) => ({
      _id: c._id,
      alias: c.alias,
      phoneNumber: c.contactId.phoneNumber,
    }))
  );
};

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Contact = require('../models/Contact');
const UserContact = require('../models/UserContact');
const { normalizePhone } = require('../utils/phoneUtils');

exports.registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, otherEmails, initialContacts } = req.body;

    const user = await User.create({ email, password });

    const profile = await Profile.create({
      userId: user._id,
      firstName,
      lastName,
      otherEmails,
      contacts: initialContacts,
    });

    user.profileId = profile._id;
    await user.save();

    for (const rawPhone of initialContacts) {
      const normalizedPhone = normalizePhone(rawPhone);

      let contact = await Contact.findOne({ normalizedPhone });
      if (!contact) {
        contact = await Contact.create({
          phoneNumber: rawPhone,
          normalizedPhone,
        });
      }

      await UserContact.updateOne(
        { userId: user._id, contactId: contact._id },
        {
          $set: {
            alias: rawPhone, 
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        { upsert: true }
      );
    }

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration error' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.json({ token });
};

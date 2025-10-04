const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getContacts,
  addContact,
  searchContacts,
} = require('../controllers/contactController');

router.get('/contacts', auth, getContacts);
router.post('/contacts', auth, addContact);
router.get('/contacts/search', auth, searchContacts);

module.exports = router;

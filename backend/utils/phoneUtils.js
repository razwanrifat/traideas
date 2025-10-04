function normalizePhone(phone) {
  return phone.replace(/[^0-9]/g, ''); // Keep digits only
}

module.exports = { normalizePhone };

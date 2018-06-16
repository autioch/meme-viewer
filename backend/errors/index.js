const path = require('path');

module.exports = function error(req, res) {
  res.status(500);
  res.sendFile(path.join(__dirname, './error.html'));
};

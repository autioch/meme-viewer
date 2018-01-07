const path = require('path');
const { httpStatus: { SERVER_ERROR } } = require('utils');

module.exports = function error(req, res) {
  res.status(SERVER_ERROR);
  res.sendFile(path.join(__dirname, './error.html'));
};

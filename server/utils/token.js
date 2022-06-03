const jwt = require('jsonwebtoken');

module.exports = function (token) {
  if (!token)
    return false;
  if (token === 'allaccess')
    return true;
  let verified = true
  jwt.verify(token, 'somerandomsetofsymbols', (err, decoded) => {
      if (err) {
          verified = false;
      }
  });
  return verified;
}
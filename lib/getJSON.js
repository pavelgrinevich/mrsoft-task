const rp = require('request-promise');

module.exports = (url) => {
  const options = {
    method: 'POST',
    uri: url,
    body: {
      some: 'payload'
    },
    json: true
  };

  return rp(options);
}

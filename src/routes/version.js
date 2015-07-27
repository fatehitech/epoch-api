var pkg = require('../../package');

var obj = {
  env: process.env.NODE_ENV,
  semver: pkg.version
}

if (process.env.COMMIT_HASH) {
  obj.commit = {
    hash: process.env.COMMIT_HASH,
    timestamp: {
      unix: process.env.COMMIT_TIMESTAMP_U,
      human: process.env.COMMIT_TIMESTAMP_H
    }
  }
}

module.exports = {
  method: 'GET',
  path: '/version',
  handler: function(request, reply) {
    reply(obj);
  }
}

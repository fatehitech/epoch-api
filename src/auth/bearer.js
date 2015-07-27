var User = require('../models').User;

module.exports = [ 'bearer', 'bearerAuth', {
  validateFunction: function(token, callback) {
    User.findOne({
      where: { token: token }
    }).then(function(user) {
      if (!user) throw new Error('unauthorized');
      callback(null, true, { user: user })
    }).catch(function() {
      callback(null, false)
    })
  }
}]

var Promise = require('bluebird');
var models = require('./models');
var User = models.User;
var Role = models.Role;

module.exports = {
  authorize: function(token) {
    return new Promise(function(resolve, reject) {
      return User.findOne({
        where: { token: token },
        include: Role
      })
      .then(function(user) {
        if (user) return user;
        else throw new Error('user not found');
      }).then(function(user) {
        resolve(user);
      }).catch(function(err) {
        if (err) console.log(err.stack);
        reject()
      });
    })
  },
  createSession: function(email, password) {
    return new Promise(function(resolve, reject) {
      User.findOne({
        where: { email: email },
        include: Role
      })
      .then(function(user) {
        if (!user) return reject();
        user.comparePassword(password)
        .then(function(user) {
          if (user.token === null)
            return user.resetToken();
          else
            return user
        }).then(function(user) {
          resolve({
            token: user.token
          });
        }).catch(function(err) {
          if (err) console.log(err.stack);
          reject()
        });
      });
    });
  }
}

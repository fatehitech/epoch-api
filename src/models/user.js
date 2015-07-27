'use strict';
var Promise = require('bluebird');
var bcrypt = require('bcrypt');
var uuid = require('uuid');
var _ = require('lodash');

var hashPassword = function(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return reject(err);
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  });
}

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true },
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    token: {
      type: DataTypes.UUID,
      unique: true
    }
  }, {
    classMethods: {
      createWithPassword: function(password, attributes) {
        return hashPassword(password).then(function(hash) {
          attributes.password = hash;
          return User.create(attributes);
        });
      },
      associate: function(models) {
        User.hasMany(models.Role);
      }
    },
    instanceMethods: {
      resetToken: function() {
        return this.update({
          token: uuid.v4()
        })
      },
      comparePassword: function(password) {
        var user = this;
        return new Promise(function(resolve, reject) {
          if (!password) return reject();
          bcrypt.compare(password, user.password || '', function (err, isValid) {
            if (err) throw err;
            if (isValid) resolve(user);
            else reject();
          });
        });
      },
    }
  });
  return User;
};

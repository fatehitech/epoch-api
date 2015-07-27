var User = require('../models').User;
var Boom = require('boom');
var identity = require('../identity');

module.exports = [{
  method: 'DELETE',
  path: '/session', 
  handler: function(request, reply) {
    request.auth.credentials.user.resetToken();
    reply();
  },
  config: { auth: 'bearer' }
},{
  method: 'GET',
  path: '/session', 
  handler: function(request, reply) {
    reply({ user: request.auth.credentials.user });
  },
  config: { auth: 'bearer' }
},{
  method: 'POST',
  path: '/session', 
  handler: function (request, reply) {
    identity.createSession(
      request.payload.email, request.payload.password
    ).then(function(session) {
      reply(session).code(201);
    }).catch(function(err) {
      console.log('err');
      reply(Boom.unauthorized());
    })
  }
}]

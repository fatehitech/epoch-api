module.exports = {
  method: 'GET',
  path: '/init',
  handler: function(request, reply) {
    reply({});
  },
  config: { auth: 'bearer' }
}

var options = { reporters: [] };

var tags = ['info'];

if (process.env.DEBUG || process.env.VERBOSE) {
  tags.push('db');
}

options.reporters.push({
  reporter: require('good-console'),
  events: { log: tags, response: '*' }
})

module.exports = {
  register: require('good'),
  options: options
}

module.exports = require('my-hapi-framework')({
  start: require.main === module, // so that you can unit test the server easily
  path: require('path').join(__dirname, 'src'), // to store your files outside the project root
  db: { // in this case we will use a database
    sequelize: require('./src/models').sequelize, // provide the sequelize instance
    sync: { // existence of this key means we should sync the database
      force: process.env.FORCE_SYNC // force sync will be controlled by env var
    },
    seed: [process.argv[2] === 'seed', function(db) {
      return db.models.User.createWithPassword('pass', {
        email: 'keyvan@fatehitech.com',
      });
    }]
  }
})

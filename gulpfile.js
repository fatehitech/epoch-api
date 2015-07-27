var gulp = require('gulp');
var devServer = require( 'gulp-develop-server' );

var paths = {
  server: ['./index.js', './config/**/*.json', './src/**/*.js']
};

gulp.task('default', ['watch']);

gulp.task('watch', function() {
  devServer.listen( { env: { PORT: 3000 }, path: paths.server[0] } );
  gulp.watch(paths.server, devServer.restart );
});

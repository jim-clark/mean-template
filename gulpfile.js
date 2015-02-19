(function() {

  // grab our gulp packages
  var gulp = require('gulp'),
      gutil = require('gulp-util'),
      nodemon = require('gulp-nodemon');

  //register nodemon task
  gulp.task('nodemon', function() {
    nodemon({
      script: 'server.js',
      ext: 'js html',
      env: { 'NODE_ENV': 'development' }
    })
      .on('restart');
  });

  // runs when you run 'gulp'
  gulp.task('default', ['nodemon']);


})();
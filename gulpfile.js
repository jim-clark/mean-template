(function() {

  // grab our gulp packages
  var gulp = require('gulp'),
      gutil = require('gulp-util'),
      nodemon = require('gulp-nodemon');
      templateCache = require('gulp-angular-templatecache');


  // builds an anglular module, 'templates', as 'templates.js'
  gulp.task('angular-templates', function () {
      gulp.src('./src/**/*.html')
          .pipe(templateCache())
          .pipe(gulp.dest('src/js'));
  });

  // register nodemon task
  gulp.task('nodemon', function() {
    nodemon({
      script: './server.js',
      ext: 'js html',
      env: { 'NODE_ENV': 'development' }
    })
      .on('restart');
  });

  // runs when you run 'gulp'
  gulp.task('default', ['angular-templates', 'nodemon']);


})();
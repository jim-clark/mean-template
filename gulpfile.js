(function() {

  // grab our gulp packages
  var gulp = require('gulp'),
      gutil = require('gulp-util'),
      nodemon = require('gulp-nodemon'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      templateCache = require('gulp-angular-templatecache'),
      child_process = require('child_process');


  // builds an anglular module, 'templates', as 'templates.js'
  gulp.task('angular-templates', function () {
      gulp.src('./src/**/*.html')
          .pipe(templateCache(
            'templates.js',
            {
              standalone: true,
              module: 'templates'
            }))
          .pipe(gulp.dest('src/js'));
  });


  /*  DEVELOPMENT TASKS FOR 'default' */

  // var cmdScript = "osascript -e tell application 'iTerm2'\n activate \n set db to (make new terminal) \n exec command 'mongod'\n end tell";
  // var cmdScript = 'osascript -e tell application "System Events" to tell process "iTerm2" to keystroke "t" using {command down} end tell';

  // Start mongodb
  gulp.task('start-mongodb', function () {
    child_process.exec('mongod', function (err, stdout, stderr) {
      if (err) {console.log(err)}
      console.log(stdout);
    });
  });

  // copy less and css stylesheets to public/css
  // less files are compiled upon browser request by express middleware
  gulp.task('copy-stylesheets', function () {
    gulp.src('./src/stylesheets/*.*')
      .pipe(gulp.dest('./public/css'));
  });
  
  // register nodemon task
  gulp.task('nodemon', ['start-mongodb'], function () {
    nodemon({
      script: './server.js',
      ext: 'js html',
      env: { 'NODE_ENV': 'development' }
    })
      .on('restart');
  });

  /* END DEVELOPMENT TASKS */


  // runs when you run 'gulp'
  gulp.task('default', [
    'start-mongodb',
    'angular-templates', 
    'copy-stylesheets',
    'nodemon'
  ]);


})();
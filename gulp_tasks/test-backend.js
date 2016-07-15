"use strict";
const gulp = require('gulp');
let mocha = require('gulp-mocha');


gulp.task('test-backend', function () {
  return gulp.src(['server/test/**/*.js'], { read: false })
  .pipe(mocha({ reporter: 'min' }));
  // .on('error', util.log)
  // .on('message', util.log);
});

//gulp.task('watch-test-backend', function () {
//  gulp.watch([
//    'server/app.js', 'server/test/**', 'server/src/**'
//  ], ['test-backend']);
//});


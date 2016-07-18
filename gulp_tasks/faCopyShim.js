"use strict";
const gulp = require('gulp');
let copy = require('gulp-copy');

const conf = require('../conf/gulp.conf');

gulp.task('faCopyShim', faCopyShim);
function faCopyShim() {
  return gulp.src('bower_components/font-awesome/fonts/**.*')
              .pipe(gulp.dest('.tmp/fonts'));
}

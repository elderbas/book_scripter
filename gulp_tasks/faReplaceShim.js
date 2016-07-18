"use strict";
const gulp = require('gulp');
let replace = require('gulp-replace');
const conf = require('../conf/gulp.conf');

gulp.task('faReplaceShim', faReplaceShim);

function faReplaceShim() {
  return gulp.src(conf.path.tmp('font-awesome.css'))
            .pipe(replace(/\.\.\/fonts/g, 'fonts'))
            .pipe(gulp.dest(conf.path.tmp(), {overwrite: true}));
}

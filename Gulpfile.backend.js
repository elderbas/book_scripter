var gulp = require('gulp');
var mocha = require('gulp-mocha');
var util = require('gulp-util');


gulp.task('test', function () {
  return gulp.src(['server/test/**/*.js'], { read: false })
  .pipe(mocha({ reporter: 'min' }))
  .on('error', function (err) {
    util.log(err.toString());
    this.emit('end');
  })
  ;
});

gulp.task('watch-test', function () {
  return gulp.watch([
    'server/app.js', 'server/test/**', 'server/src/**'
  ], gulp.series('test'));
});

gulp.task('default', gulp.series('test', 'watch-test'));






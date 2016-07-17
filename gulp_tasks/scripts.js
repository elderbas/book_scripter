const gulp = require('gulp');
const eslint = require('gulp-eslint');

const babel = require('gulp-babel');
const conf = require('../conf/gulp.conf');

gulp.task('scripts', scripts);

function scripts() {
  return gulp.src([conf.path.src('**/*.js')])
    .pipe(eslint({
      rules: {
        'padded-blocks': 0,
        'space-before-function-paren': 0,
        'prefer-arrow-callback': 0,
        'no-alert': 0,
      },
      globals: {
        '$': false,
        'jquery': false
      }
    }))
    .pipe(eslint.format())

    .pipe(babel())
    .pipe(gulp.dest(conf.path.tmp()));
}

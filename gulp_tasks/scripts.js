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
        'babel/arrow-parens': 0,
        'no-warning-comments': 0,
        'prefer-const': 0,
        'spaced-comment': 0,
        'no-multiple-empty-lines': 0,
        'brace-style': 0,
        'max-statements-per-line': 0,
        'no-unused-vars': 0
      },
      globals: {
        '$': false,
        'jquery': false,
        '_': false
      }
    }))
    .pipe(eslint.format())

    .pipe(babel())
    .pipe(gulp.dest(conf.path.tmp()));
}

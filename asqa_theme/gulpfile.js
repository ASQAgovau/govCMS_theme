var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var bs = require('browser-sync').create();

function handleError(error) {
  console.log(error);
}

gulp.task('sass', function() {
  return gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    // minimise CSS
    // .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('css'))
    .pipe(bs.stream());
});

gulp.task('watch', function() {
  gulp
    .watch('sass/**/*.scss', ['sass']);
});

gulp.task('browser-sync', function() {
  bs.init({
    proxy: {
      target: "http://eejgollan.dev.dd:8083"
    }
  });
});

gulp.task('default', ['sass', 'watch', 'browser-sync']);

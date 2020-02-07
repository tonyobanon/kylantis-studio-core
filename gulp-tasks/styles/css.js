var csscomb = require('gulp-csscomb');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var rtlcss = require('gulp-rtlcss');
var merge = require('merge-stream');

module.exports = (gulp, callback) => {
  const cssCombTask = function () {
    const ltrComb = gulp.src(['**/*.css', '!**/*.min.css'], { cwd: config.destination.css })
      .pipe(csscomb())
      .pipe(gulp.dest(config.destination.css));

    const rtlComb = gulp.src(['**/*.css', '!**/*.min.css'], { cwd: config.destination.css_rtl })
      .pipe(csscomb())
      .pipe(gulp.dest(config.destination.css_rtl));

    return merge(ltrComb, rtlComb);
  }

  const cssMinTask = function () {
    const ltrMin = gulp.src(['**/*.css', '!**/*.min.css'], { cwd: config.destination.css })
      .pipe(cssmin())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(config.destination.css));

    const rtlMin = gulp.src(['**/*.css', '!**/*.min.css'], { cwd: config.destination.css_rtl })
      .pipe(cssmin())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(config.destination.css_rtl));

    return merge(ltrMin, rtlMin);
  }

  const cssRtlTask = function () {
    return gulp.src(['**/*.css', '!**/*.min.css'], { cwd: config.destination.css })
      .pipe(rtlcss())
      .pipe(gulp.dest(config.destination.css_rtl));
  }

  // ---------------------------------------------------------------------------
  // Exports

  return {
    css_comb: cssCombTask,
    css_min: cssMinTask,
    css_rtl: cssRtlTask
  }
}

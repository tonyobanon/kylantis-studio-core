var autoprefixer = require('gulp-autoprefixer');
var merge = require('merge-stream');

module.exports = (gulp, callback) => {

  const autoprefixCssTask = function () {
    const ltrAutoPrefix = gulp.src(['**/*.css', '!**/*.min.css'], { cwd: config.destination.css })
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(gulp.dest(config.destination.css));

    const rtlAutoPrefix = gulp.src(['**/*.css', '!**/*.min.css'], { cwd: config.destination.css_rtl })
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(gulp.dest(config.destination.css_rtl));

    return merge(ltrAutoPrefix, rtlAutoPrefix);
  }

  // ---------------------------------------------------------------------------
  // Exports

  return {
    css: autoprefixCssTask,
  }
}

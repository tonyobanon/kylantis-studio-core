var sass = require('gulp-sass');
var merge = require('merge-stream');

module.exports = (gulp, callback) => {

  const scssStyleTask = function () {

    var style = gulp.src(['**/*.scss', '!**/*-rtl.scss'], { cwd: config.source.sass })
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(config.destination.css));

    var styleRtl = gulp.src(['!**/*.scss', '**/*-rtl.scss'], { cwd: config.source.sass })
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(config.destination.css_rtl));

    return merge(style, styleRtl);
  }

  // ---------------------------------------------------------------------------
  // Exports

  return {
    css: gulp.series(scssStyleTask),
  }
}

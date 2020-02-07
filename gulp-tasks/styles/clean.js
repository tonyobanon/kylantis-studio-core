var clean = require('gulp-clean');
var merge = require('merge-stream');

module.exports = (gulp, callback) => {
  
  const cleanCssTask = function () {
    const ltrClean = gulp.src(config.destination.css, {
      read: false,
      allowEmpty: true
    })
      .pipe(clean());

    const rtlClean = gulp.src(config.destination.css_rtl, {
      read: false,
      allowEmpty: true
    })
      .pipe(clean());

    return merge(ltrClean, rtlClean);
  }


  // ---------------------------------------------------------------------------
  // Exports

  return {
    css: cleanCssTask,
  }
}

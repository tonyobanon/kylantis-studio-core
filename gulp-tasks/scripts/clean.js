var clean = require('gulp-clean');
var merge = require('merge-stream');

module.exports = (gulp, callback) => {

  const cleanJsTask = function () {
    return gulp.src(config.destination.js, {
      read: false,
      allowEmpty: true
    })
      .pipe(clean());
  }

  // ---------------------------------------------------------------------------
  // Exports

  return {
    js: cleanJsTask,
  }
}

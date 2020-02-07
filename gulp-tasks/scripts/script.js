var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var gutil = require('gulp-util');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

/**
 *
 * We are currently not using core-js ES polyfills, even though we actually should be
 * doing so, for complete es.next support, hence we set useBuiltIns: 'false'. The reason for
 * this is using core-js polyfills (setting useBuiltIns: 'usage') would mean that each js
 * artifact would include a "require" for the polyfill in core-js which would then
 * mandate us to use a code bundler i.e browserify
 *
 * Now doing a require in the browser is not actually a problem, since browserify can inline
 * the "require"d assets. The problem however is we don't have a scalable stategy to make
 * this work because file sizes would be over-bloated, and this is way beyond our perf budget
 *
 * In light of this, we are preventing babel from adding a require, but instead we are bundling
 * the polyfills (only), and then they will need to be included as part of the scripts import
 * in the browser
 */

module.exports = (gulp, callback) => {
  const jsTask = function () {
    return gulp.src(['**/*.js', '!**/*.min.js'], { cwd: config.source.js })
      .pipe(babel())
      .pipe(uglify({
        mangle: true,
        compress: true,
      }))
      .on('error', function (err) { console.log('\x1b[31m', err.toString()); })
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(config.destination.js));
  }

  const jsWatchTask = function () {
    return watch('**/*.js', { ignoreInitial: false, cwd: config.source.js, ignored: '**/*.min.js' })
      .pipe(babel())
      .pipe(uglify({
        mangle: true,
        compress: true,
      }))
      .on('error', function (err) { console.log('\x1b[31m', err.toString()); })
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(config.destination.js));
  }

  // ---------------------------------------------------------------------------
  // Exports

  return {
    js: jsTask,
    js_watch: jsWatchTask
  }
}

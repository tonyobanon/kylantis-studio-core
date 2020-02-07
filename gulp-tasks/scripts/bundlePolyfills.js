
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const log = require('gulplog');
const fs = require('fs');
const path = require('path');

const alwaysGeneratePolyfillBundle = true;

module.exports = (gulp, callback) => {

  const jsPolyfillTask = function () {

    if (!alwaysGeneratePolyfillBundle) {
      const polyfillBundle = path.join(path.dirname(fs.realpathSync(__filename)), config.destination.js + '/polyfills/index.min.js');
      if (fs.existsSync(polyfillBundle)) {
        log.info('Skipping generation of polyfill bundle');
        return Promise.resolve();
      }
    }

    // set up the browserify instance on a task basis
    const b = browserify({
      entries: 'gulp-tasks/scripts/es-polyfills/index.js',
      debug: true,
    });

    return b.bundle()
      .pipe(source('index.min.js'))
      .pipe(buffer())
      .pipe(uglify())
      .on('error', log.error)
      .pipe(gulp.dest(config.destination.js + '/polyfills'));
  };

  return {
    js: jsPolyfillTask
  }
}

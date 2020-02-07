
module.exports = (gulp, callback) => {

    const cleanTasks = require("./clean")(gulp);

    const scriptTasks = require("./script")(gulp);
    const polyfillTask = require("./bundlePolyfills")(gulp);

    return {
        clean: gulp.parallel(cleanTasks.js),
        build: gulp.series(cleanTasks.js, scriptTasks.js, polyfillTask.js),
        watch: gulp.parallel(scriptTasks.js_watch)
    }
}
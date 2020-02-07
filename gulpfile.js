// Require the modules.
var gulp = require("gulp");
var config = require("./config.json");

// Global Variables
global.config = config;

console.log('\x1b[32m', 'Starting Gulp..');

// TODO Add image minify
const styleTasks = require("./gulp-tasks/styles")(gulp);
const scriptTasks = require("./gulp-tasks/scripts")(gulp);

gulp.task("clean", gulp.parallel(styleTasks.clean, scriptTasks.clean));
gulp.task("build", gulp.parallel(styleTasks.build, scriptTasks.build));
gulp.task("watch", gulp.parallel(styleTasks.watch, scriptTasks.watch));

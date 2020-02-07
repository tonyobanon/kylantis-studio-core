const watch = require('gulp-watch');
const filter = require('gulp-filter');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csscomb = require('gulp-csscomb');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const rtlcss = require('gulp-rtlcss');

module.exports = (gulp, callback) => {

    const autoPrefixTasks = require("./autoprefix")(gulp);
    const cleanTasks = require("./clean")(gulp);
    const cssTasks = require("./css")(gulp);
    const scssTasks = require("./scss")(gulp);

    const watchStyles = () => {
        const glob = ['**/*.css', '!**/*-rtl.css'];
        const ltrFilter = filter(glob, { restore: true });

        return watch('**/*.scss', { ignoreInitial: false, cwd: config.source.sass })
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(csscomb())

            .pipe(ltrFilter)
            .pipe(gulp.dest(config.destination.css))
            .pipe(cssmin())
            .pipe(rename({ suffix: '.min', extname: '.css' }))
            .pipe(gulp.dest(config.destination.css))
            .pipe(rtlcss())
            .pipe(rename(function (path) {
                path.basename = path.basename.replace('.min', '')
            }))
            .pipe(ltrFilter.restore)

            .pipe(gulp.dest(config.destination.css_rtl))
            .pipe(cssmin())
            .pipe(rename({ suffix: '.min', extname: '.css' }))
            .pipe(gulp.dest(config.destination.css_rtl));
    }

    return {
        clean: gulp.parallel(cleanTasks.css),
        build: gulp.series(cleanTasks.css, scssTasks.css, cssTasks.css_rtl, autoPrefixTasks.css, cssTasks.css_comb, cssTasks.css_min),
        watch: watchStyles
    }
}
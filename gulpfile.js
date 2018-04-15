const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

const config = {
    styleSrc: './src/scss/',
     styleDist: './dist/css/',
};

gulp.task('sass', function () {
    gulp.src(config.styleSrc + 'style.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.styleDist));
});

gulp.task('watch',function () {
    gulp.watch(config.styleSrc + '**/*.scss', ['sass'])
});

gulp.task('default', ['sass', 'watch']);
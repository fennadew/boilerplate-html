const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const config = {
    styleSrc: './src/scss/',
    styleDist: './dist/css/',
    jsSrc: './src/js/',
    jsDist: './dist/js/',
};

gulp.task('sass', function () {
    gulp.src(config.styleSrc + 'style.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.styleDist));
});

gulp.task('js', function () {
    gulp.src(config.jsSrc + 'app.js')
        .pipe(gulp.dest(config.jsDist))
});

gulp.task('watch',function () {
    gulp.watch(config.styleSrc + '**/*.scss', ['sass'])
});

gulp.task('build', ['sass', 'js']);
gulp.task('default', ['build', 'watch']);


const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');
const imagemin = require('gulp-imagemin');

const config = {
    rootSrc: './',
    imgSrc: './src/images/',
    imgDist: './dist/images/',
    styleSrc: './src/scss/',
    styleDist: './dist/css/',
    jsSrc: './src/js/',
    jsDist: './dist/js/',
    livereload: true
};

gulp.task('connect', () => {
    connect.server({
        port: 8080,
        livereload: config.livereload
    });
});

gulp.task('sass', () => {
    gulp.src(config.styleSrc + 'style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.styleDist))
        .pipe(connect.reload());
});

gulp.task('js', () => {
    return browserify({entries: config.jsSrc + 'app.js', debug: true})
        .transform(babelify, {
            presets: ['env']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(rename({extname: '.min.js'}))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.jsDist))
        .pipe(connect.reload());
});

gulp.task('html', () => {
    gulp.src(config.rootSrc + '*.html')
        .pipe(gulp.dest(config.rootSrc))
        .pipe(connect.reload());
});

gulp.task('optimize-images', () => {
    gulp.src(config.imgSrc + '/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(config.imgDist))
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch(config.styleSrc + '**/*.scss', ['sass'])
    gulp.watch([config.rootSrc + '*.html'], ['html']);
    gulp.watch(config.styleSrc + '**/*.js', ['js'])
});

gulp.task('build', ['sass', 'js', 'optimize-images']);
gulp.task('default', ['connect', 'build', 'watch']);


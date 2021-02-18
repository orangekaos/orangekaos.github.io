var gulp        = require('gulp');
var concat      = require('gulp-concat')
var uglify      = require('gulp-terser')
var sourcemaps  = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile all .scss into site_media/css/layout.css
gulp.task('sass', function() {
    return gulp.src([
            'node_modules/bootstrap/scss/bootstrap.scss',
            // 'node_modules/jquery-fancybox/source/scss/jquery.fancybox.scss',
            'site_media/css/*.scss'
        ])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('layout.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("site_media/css"))
        .pipe(browserSync.stream());
});

// Compile all javascript files into src/js/main.js
gulp.task('js', function() {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/popper.js/dist/umd/popper.min.js',
            // 'node_modules/jquery-fancybox/source/js/jquery.fancybox.js',
            //'custom/scripts.js'
        ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest("site_media/js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./"  
    });

    gulp.watch(['./node_modules/bootstrap/scss/bootstrap.scss', './site_media/css/*.scss'], gulp.series('sass'));
    gulp.watch("./*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.parallel('js','serve'));
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('scripts', function() {
    return gulp.src('src/js/index.js')
        .pipe(browserify({
            standalone: 'AAAA'
        }))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('stylus', function() {
    return gulp.src('src/css/**/*.styl')
        .pipe(stylus())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/'));
})

gulp.task('watch:js', function() {
    return gulp.watch('src/js/**/*.js', ['scripts']);
});

gulp.task('watch:stylus', function() {
    return gulp.watch('src/css/**/*.styl', ['stylus']);
})



gulp.task('default', ['scripts', 'stylus', 'watch:js', 'watch:stylus']);
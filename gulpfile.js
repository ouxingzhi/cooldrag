var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = require('./webpack.config');

gulp.task('clean',function(){
    return  gulp.src('./dist/*', { read: false })
        .pipe(clean());
})

gulp.task('scripts', ['clean'],function(callback) {
    webpack(webpackConfig,function(err,info){
        callback(err);
    });
});

gulp.task('devServer', ['build:stylus','watch:stylus'],function(){
    var config = Object.create(webpackConfig);
    var compiler = webpack(config);
    var server = new WebpackDevServer(compiler, {
        stats: { colors: true }
    });
    server.listen(8089, "localhost", function () { }); 
});

gulp.task('build:stylus', ['clean'],function(){
    return gulp.src(['./src/css/**/*.styl'])
        .pipe(stylus())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch:stylus',function(){
    return gulp.watch('./src/css/**/*.styl', ['build:stylus']);
})



gulp.task('default', ['scripts', 'build:stylus']);
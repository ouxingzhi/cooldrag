var gulp = require('gulp');
var browserify = require('gulp-browserify');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = require('./webpack.config');

gulp.task('scripts', function(callback) {
    webpack(webpackConfig,function(err,info){
        callback(err);
    });
});

gulp.task('devServer',function(){
    var config = Object.create(webpackConfig);
    var compiler = webpack(config);
    var server = new WebpackDevServer(compiler, {
        stats: { colors: true }
    });
    server.listen(8089, "localhost", function () { }); 
})




gulp.task('default', ['scripts']);
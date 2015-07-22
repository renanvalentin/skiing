/*global -$ */
'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('eslint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.eslint())
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint.format());
});

gulp.task('es6', ['eslint'], function () {
  browserify({
    entries: './app/scripts/main.js',
    debug: true
  })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./.tmp'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('preflight', ['eslint']);

gulp.task('produce', ['preflight', 'es6']);

gulp.task('serve', ['produce'], function () {
  browserSync({
    notify: false,
    port: 3030,
    server: {
      baseDir: ['.tmp', 'app']
    }
  });

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js'
  ]).on('change', reload);

  gulp.watch('app/scripts/**/*.js', ['es6']);
});

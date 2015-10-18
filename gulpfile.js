'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

// JS Hint
gulp.task('lint', function() {
  gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile and minify javascript
gulp.task('javascript', function() {
  gulp.src(['./src/js/*.js'])
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist'));
});

// Compile and minify stylesheets
gulp.task('stylesheets', function() {
  gulp.src('./src/css/*.scss')
    .pipe(sass({onError: function(e) { console.log(e); },
      includePaths: [
        'node_modules/zurb-foundation-5/scss'
      ]}))
    .pipe(prefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist'));
});

// Watch for compile
gulp.task('watch-all', function() {
  gulp.watch(['./src/js/**/*.js'],[
    'lint',
    'javascript'
  ]);
  gulp.watch(['./src/css/**/*.scss'], [
    'stylesheets'
  ]);
});

gulp.task('default', ['javascript','stylesheets']);
gulp.task('watch', ['watch-all']);
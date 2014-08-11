/*
Folder Structure :




gulpfile.js <-- [CURRENT FILE]
.bowerrc
bower.json
*/

// Modules required
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');

var paths = {
  built_modules: [
    './src/components/jquery/dist/jquery.min.js',
    './src/components/foundation/js/foundation.min.js',
    './src/components/angular/angular.min.js',
    './src/components/angular-route/angular-route.min.js',
    './src/components/angular-foundation/mm-foundation.min.js',
    './src/components/angular-foundation/mm-foundation-tpls.min.js'
  ],
  modules: [
  ],
  fonts: [
    './src/components/font-awesome/fonts/*'
  ],
  sass: './src/sass/**/*.sass',
  images: './src/images/*',
};

gulp.task('sass', function () {
  return gulp.src(paths.sass)
  .pipe(sass())
  .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest('./public/images'));
});

gulp.task('fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('build_modules', function () {

  if (!paths.modules.length)
    return;

  return gulp.src(paths.modules)
    .pipe(shell([
      'cd <%= file.path %>; npm install',
      'cd <%= file.path %>; grunt build'
    ]));
});

gulp.task('modules', [ 'build_modules' ], function () {

  return gulp.src(paths.built_modules);
    .pipe(gulp.dest('./public/javascripts/'));
});

// Watch
gulp.task('watch', function() {
  gulp.watch(paths.sass, [ 'sass' ]);
  gulp.watch(paths.images, [ 'images' ]);
  gulp.watch(paths.fonts, [ 'fonts' ]);
});

gulp.task('build', [ 'modules', 'sass', 'fonts', 'images' ]);

var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload');
ts = require('gulp-typescript');
sourcemaps = require('gulp-sourcemaps');

// compile and pipe typescript
gulp.task('typescript', function () {
  return gulp.src(['src/**/*.ts', './typings/**/*.d.ts'])
    .pipe(ts())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app'));
});

// pipe everything that is not typescript to /app
gulp.task('build', ['typescript'], function (cb) {
  return gulp.src(['src/**/*', '!src/**/*.ts'])
    .pipe(gulp.dest('app'));
});

/** Defaults */
gulp.task('default', ['develop']);

/** Developer Debugging */
gulp.task('develop', ['build', 'watch'], function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js nunjucks',
    stdout: false,
    watch: 'src/**/*'
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('watch', function () {
  return gulp.watch('src/**/*', ['build']);
});
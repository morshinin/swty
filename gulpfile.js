// #VARS

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
// var connect = require('gulp-connect');
var browserSync = require('browser-sync');
// var csslint = require('gulp-csslint');

// var magician = require('postcss-font-magician');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var pxtorem = require('postcss-pxtorem');

var jade = require('gulp-jade');
var lost = require('lost');

// #CSS
gulp.task('css', function() {
  var processors = [
    // magician({hosted:'../fonts'}),
    lost,
    autoprefixer,
    pxtorem({propWhiteList:[]})
    // cssnano
  ];
  return gulp.src('./source/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./build'))
    // .pipe(connect.reload());
    .pipe(browserSync.reload({stream:true}));
});

// # LINT

gulp.task('lint', function() {
  gulp.src('./build/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});

// #HTML

gulp.task('html', function() {
  gulp.src('./source/jade/*.jade')
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('./build'))
    // .pipe(connect.reload());
    .pipe(browserSync.reload({stream:true}));
});

// #WATCH

gulp.task('watch', function() {
  gulp.watch('./source/sass/**/*.scss', ['css']);
  gulp.watch('./source/jade/**/*.jade', ['html']);
});

// #LIVE RELOAD
// gulp.task('connect', function() {
//   connect.server({
//     root: 'build',
//     livereload: true,
//     open: true
//   });
// });

//  BROWSER SYNC
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "build"
    }
  });
});

// gulp.task('start', ['connect', 'watch']);
gulp.task('start', ['browser-sync', 'watch']);

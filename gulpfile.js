var gulp = require("gulp"),
    browserSync = require('browser-sync').create(),
    less = require("gulp-less"),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    deleteLines = require('gulp-delete-lines'),
    insertLines = require('gulp-insert-lines'),
    plumber = require('gulp-plumber'),

    // js files
    scripts  = {
      main: 'develop/js/main.js'
    };

// Static Server + watching less/html files
gulp.task('serve', ['less'], function() {
  browserSync.init({
      server: "./"
  });

  gulp.watch("develop/less/**/*.less", ['less']);
  gulp.watch("develop/js/*.js").on('change', browserSync.reload);
  gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile less into CSS & auto-inject into browsers
gulp.task('less', function() {
  return gulp.src("develop/less/main.less")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("develop/css"))
    .pipe(browserSync.stream());
});

// Autoprefixer and minify CSS
gulp.task('css', function() {
  return gulp.src("develop/css/main.css")
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/css'))
});

// Concat and minify JS
gulp.task('js', function() {
  return gulp.src([
    scripts.main
  ])
    .pipe(concat('main.js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify().on('error', function() {
      console.log(err);
    }))
    .pipe(gulp.dest('build/js'))
});

// HTML
gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(deleteLines({
      'filters': [
        /<link\s+rel=/i
      ]
    }))
    .pipe(insertLines({
      'before': /<\/head>$/,
      'lineBefore': '    <link rel="stylesheet" type="text/css" href="css/main.min.css">',
    }))
    .pipe(deleteLines({
      'filters': [
        /<script\s+src=/i
      ]
    }))
    .pipe(insertLines({
      'before': /<\/body>$/,
      'lineBefore': '    <script src="js/main.min.js"></script>'
    }))
    .pipe(gulp.dest('build'))
});

// assets
gulp.task('public', function() {
  return gulp.src('public/**/*')
    .pipe(gulp.dest('build/public'))
});

// default task
gulp.task('default', ['serve']);

// build task
gulp.task('build', ['css', 'js', 'html', 'public']);

var gulp = require("gulp"),
	less = require("gulp-less"),
	browserSync = require("browser-sync").create();
	watch = require('gulp-watch'),
	minifyCSS = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	concatJS = require("gulp-concat"),
	minifyJS = require("gulp-uglify"),
	deleteLines = require("gulp-delete-lines"),
	insertLines = require("gulp-insert-lines"),
	plumber = require("gulp-plumber"),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),

	// js files
	scripts = {
		jquery: "node_modules/jquery/dist/jquery.js",
		slideshow: "vendor/vegas/dist/vegas.js",
		validation: "vendor/jquery-validation/dist/jquery.validate.js",
		fancybox: "vendor/fancybox/dist/jquery.fancybox.js",
		main: "dev/js/main.js"
	};

/**
 * gulp
 * @desc compiles the less files and reloads the page
 */
gulp.task("less", function() {
	gulp.src("dev/less/main.less")
		.pipe(plumber())
		.pipe(less())
		.pipe(gulp.dest("dev/css"))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task("browserSync", function() {
	browserSync.init({
		server: {
			baseDir: "./",
		},
		browser: "google-chrome",
		notify: false
	});
});

gulp.task('default', ['browserSync', 'less'], function() {
	gulp.watch('dev/less/**/*.less', ['less', browserSync.reload]);
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('dev/js/**/*.js', browserSync.reload);
});

/**
 * gulp production
 * @desc prepares and saves the files in the production folder
 */
gulp.task('css', function() {
	return gulp.src('dev/css/main.css')
		.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
		}))
		.pipe(minifyCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('production/dist/css'))
});

gulp.task('js', function() {
	return gulp.src([
			scripts.jquery,
			scripts.slideshow,
			scripts.validation,
			scripts.fancybox,
			scripts.main
		])
		.pipe(concatJS('main.js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifyJS().on('error', function() {
			console.log(err);
		}))
		.pipe(gulp.dest('production/dist/js'))
});

gulp.task('html', function() {
	return gulp.src('*.html')
		.pipe(deleteLines({
			'filters': [
				/<link\s+rel=/i
			]
		}))
		.pipe(insertLines({
			'before': /<\/head>$/,
			'lineBefore': '		<link rel="stylesheet" type="text/css" href="dist/css/main.min.css">',
		}))
		.pipe(deleteLines({
			'filters': [
				/<script\s+src=/i
			]
		}))
		.pipe(insertLines({
			'before': /<\/body>$/,
			'lineBefore': '		<script src="dist/js/main.min.js"></script>'
		}))
		.pipe(gulp.dest('production'))
});

gulp.task('assets', function() {
	return gulp.src('assets/**/*')
		.pipe(gulp.dest('production/assets'))
});

gulp.task('images', function() {
	return gulp.src('assets/**/*')
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			optimizationLevel: 5,
			svgoPlugins: [{removeViewBox: true}]
		}))
		.pipe(plumber())
		.pipe(gulp.dest('production/assets'))
});

gulp.task('production', ['css','js', 'html', 'assets', 'images']);
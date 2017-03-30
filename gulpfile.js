var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	csso = require('gulp-csso'),
	minifyHTML = require('gulp-htmlmin');

gulp.task('default', ['minjs', 'mincss', 'minhtml']);

gulp.task('minjs', function() {
	return gulp.src(['src/js/*.js'])
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('mincss', function() {
	return gulp.src(['src/css/*.css'])
		.pipe(csso())
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('minhtml', function() {
	return gulp.src(['src/index.html'])
		.pipe(minifyHTML({
			removeComments: true,
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
	gulp.watch(['src/index.html', "src/js/app.js", "src/css/style.css"]).on('change', livereload.changed);
	gulp.watch(['src/css/*.css'], ['mincss']);
	gulp.watch(['src/js/*.js'], ['minjs']);
	gulp.watch(['src/*.html'], ['minhtml']);
});
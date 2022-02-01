const gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	htmlmin = require('gulp-htmlmin'),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	pump = require('pump');
 
const sassSource = './src/assets/stylesheets/sass/*.scss',
	  sassDestSource = './src/assets/stylesheets/',
	  jsSource = './src/assets/javascripts/*.js',
	  jsDestSource = './src/assets/javascripts/';

gulp.task('html', () => {
	return gulp.src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: false }))
    .pipe(gulp.dest('./src'));
});

gulp.task('sass', () => {
	return gulp.src(sassSource)
    .pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		Browserslist: ['last 2 versions'],
        cascade: false 
    }))
    .pipe(gulp.dest(sassDestSource))
	.pipe(browserSync.stream());
});

gulp.task('js', (cb) => {
	pump([
		gulp.src(jsSource),
		//uglify(),
		gulp.dest(jsDestSource)
	],
	cb
	);
});

gulp.task('serve', () => {
	browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
	gulp.watch( sassSource, gulp.series(['sass','js','html']));
	gulp.watch(['./src/*.html','./src/assets/javascripts/*.js']).on('change', browserSync.reload);
});

gulp.task('default', gulp.series(['html', 'sass', 'js', 'serve']));
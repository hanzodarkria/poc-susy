var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('sass', function(){
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths: ['node_modules/susy/sass']
		}).on('error', sass.logError))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream : true
		}))
});

gulp.task('browserSync', function(){
	browserSync.init({
		server : 'app'
	})
});

gulp.task('useref', function(){
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function(){
	return del.sync('dist');
});

gulp.task('watch', function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', reload);
});

gulp.task('generate-font-resource', function() {
    return gulp.src('app/scss/fonts/**/*.*')
        .pipe(gulp.dest('app/css/fonts/'));
});

gulp.task('build', function(callback){
	runSequence('clean:dist', ['sass','useref'], callback)
});

gulp.task('default', function(callback){
	runSequence(['sass','browserSync','watch', 'generate-font-resource'], callback)
});




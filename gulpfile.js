var gulp = require('gulp')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')

// Build
// -----

gulp.task('build', function () {
    return gulp
        .src('src/index.js')
        .pipe(uglify())
        .pipe(rename('ken-burns-slideshow.min.js'))
        .pipe(gulp.dest('dist/'))
})

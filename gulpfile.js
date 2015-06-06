var gulp = require('gulp')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var sourceStream = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var browserify = require('browserify')


// Build
// -----

gulp.task('build', function () {
    return browserify({
        entries: ['src/expose-to-window.js'],
        debug: true
    })
        .transform('brfs')
        .bundle()
        .pipe(sourceStream('ken-burns-slideshow.global.min.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/'))
})

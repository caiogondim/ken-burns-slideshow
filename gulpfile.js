var gulp = require('gulp')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var sourceStream = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var browserify = require('browserify')
var ghPages = require('gulp-gh-pages')

// Build
// -----

gulp.task('build', function () {
    return browserify({
        entries: ['src/expose-to-window.js']
    })
        .transform('brfs')
        .bundle()
        .pipe(sourceStream('ken-burns-slideshow.global.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
        .pipe(gulp.dest('example/'))
})

// Deploy
// ------

// Deploys example page to GitHub page
gulp.task('deploy', function () {
    return gulp
        .src('example/**')
        .pipe(ghPages())
})

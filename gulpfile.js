var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean');

gulp.task('copy', ['clean'], function(){
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));    
});

gulp.task('clean', function(){
    return gulp.src('dist')
        .pipe(clean());       
});

gulp.task('build-img', ['copy'], function(){
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/img'))
});

/*
Poderíamos escrever assim o retorno do stream

gulp.task('clean', function() {
    var stream = gulp.src('dist')
        .pipe(clean());
    return stream;
});
*/



var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlReplace = require('gulp-html-replace'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    cssmin = require('gulp-cssmin');

gulp.task('default', ['copy'], function(){
    gulp.start('build-img', 'usemin');
});

gulp.task('copy', ['clean'], function(){
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));    
});

gulp.task('clean', function(){
    return gulp.src('dist')
        .pipe(clean());       
});

gulp.task('build-img', function(){
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/img'))
});

gulp.task('usemin', function(){
    gulp.src('dist/**/*.html')
        .pipe(usemin({
            'js': [uglify],
            'css': [cssmin]
        }))
        .pipe(gulp.dest('dist'));
});

// gulp.task('build-js', function(){
//     gulp.src(['dist/js/jquery.js','dist/js/home.js','dist/js/produto.js'])
//         .pipe(concat('all.js'))//recebe como parâmetro o nome do arquivo resultante da concatenação
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));    
// });

// gulp.task('build-html', function(){
//     gulp.src('dist/**/*.html')
//         .pipe(htmlReplace({
//             js: 'js/all.js'
//         }))
//         .pipe(gulp.dest('dist'));
    
// });

/*
Poderíamos escrever assim o retorno do stream

gulp.task('clean', function() {
    var stream = gulp.src('dist')
        .pipe(clean());
    return stream;
});
*/


/**
 * Plugin para concaternar arquivos no gulp
 * 
 * npm install gulp-concat --save-dev
 * 
 * Plugin para atualizar html
 * 
 * npm install gulp-html-replace --save-dev
 * 
 * Plugin para minificar arquivos JS
 * 
 * npm install gulp-uglify --save-dev
 * 
 * 
 * npm install gulp-usemin --save-dev
 * 
 * Plugin minificar arquivo css
 * 
 * npm install gulp-cssmin --save-dev
 */
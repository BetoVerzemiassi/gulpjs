var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var htmlReplace = require('gulp-html-replace');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var cssmin = require('gulp-cssmin');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var jshintStylish = require('gulp-jshintStylish');
var csslint = require('gulp-csslint');

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

gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/js/*.js').on('change', function(event){
        gulp.src(event.path)  
            .pipe(jshint())
            .pipe(jshint.reporter(jshintStylish));  
    });
    gulp.watch('src/css/*.css').on('change', function(event){
        gulp.src(event.path)  
            .pipe(csslint())
            .pipe(csslint.reporter());  
    });
    gulp.watch('src/**/*').on('change',  browserSync.reload);
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
 * 
 * Plugin para atualização do browser, cria um servidor na máquina a partir de localhost
 * 
 * npm install browser-sync --save-dev
 * 
 * Plugin para verificação de erro de syntax em JS
 * 
 * npm install gulp-jshint --save-dev  
 * 
 * Plugin para reportar erro de js mais resumido
 * 
 * npm install jshint-stylish --save-dev
 * 
 * Plugin para verificar erro de CSS
 * 
 * npm install gulp-csslint --save-dev
 */
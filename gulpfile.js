var gulp = require("gulp");
// typescrip 
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
// sass
var sass = require('gulp-sass');
// browserSync
var browserSync = require('browser-sync').create();
// pug
var pug = require("gulp-pug");
// browserify
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
// var paths = {
//     modules: ['src/ts/main.ts','' ]
// };

gulp.task('ts', function () {
    return  tsProject.src()
            .pipe(tsProject())
            .js.pipe(gulp.dest("dist/js/"));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function(){
    return gulp.src("src/sass/**/*.scss")
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.stream());
});
// compile pug into html
gulp.task('pug', function(){
    return  gulp.src("src/pug/**/*.pug")
            .pipe(pug({
                pretty: true
            }))
            .pipe(gulp.dest("dist/"));
});
//  Bundle 
gulp.task('bundle',function(){
    return browserify({
                basedir: '.',
                debug: true,
                entries: ['src/ts/main.ts'],
                cache: {},
                packageCache: {}
            })
            .plugin(tsify)
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest("dist/js/"));
});
// Static Server + watching scss/html files
gulp.task('serve', [ 'sass', 'pug', 'bundle'], function() {

    browserSync.init({
        server: "./dist"
    });
    
    gulp.watch("src/sass/**/*.scss", ['sass']);
    gulp.watch("src/pug/**/*.pug", ['pug']);
    gulp.watch("src/ts/**/*.ts", ['bundle' , ()=> {browserSync.reload()}]);
    gulp.watch("dist/**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);


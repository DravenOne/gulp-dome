const gulp = require('gulp');
var rename = require('gulp-rename');//重命名
// var watch=require('gulp-watch');//监视
// var jshint = require("gulp-jshint");//js检查
// var imagemin = require('gulp-imagemin');//图片压缩插件
// var pngquant = require('imagemin-pngquant'); //png图片压缩插件
// var plugins = require('gulp-load-plugins')();//模块引入
const plumber = require('gulp-plumber')//
const uglify=require('gulp-uglify');//js压缩
const concat = require('gulp-concat');//合并
const connect=require('gulp-connect');//引入gulp-connect模块 
const babel = require('gulp-babel');// 语法转换
const minifyCSS = require('gulp-minify-css') //css压缩
const htmlmin = require('gulp-htmlmin'); //html压缩
const del = require('del') // 清空目录
const gutil = require('gulp-util');//错误提示
const sass = require('gulp-sass');//编译sass
const imagemin = require('gulp-imagemin');//压缩图像
const pngquant = require('imagemin-pngquant');//png图片压缩插件
const fileinclude =  require('gulp-file-include');//导入


//创建服务器
gulp.task('connect',function(){
    connect.server({
            root:'./src',
            livereload:true,//自动更新
            port:8888//端口
    })
});
const options ={
    removeComments:true,
    collapseWhitespace: true,//压缩HTML
    // collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    // removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    // removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    // removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    // minifyJS: true,//压缩页面JS
    // minifyCSS: true//压缩页面CSS
}
//压缩html
gulp.task('html',function(){
    return gulp.src('src/view/*.html')
    .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
    }))
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/view'))
    .pipe(connect.reload());
});

//转换scss为css
gulp.task('scss',function(){
    return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(connect.reload());
});

//合并压缩css
gulp.task('css',function(){
    return gulp.src('src/css/*.css')
    .pipe(plumber())
    // .pipe(concat('main.css'))//合并
    .pipe(minifyCSS({keepBreaks:true}))//压缩
    // .pipe(rename({extname:'.min.css'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

//压缩js
gulp.task('js',function(){
    return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(babel({
        presets:['es2015']
    }))
    .pipe(uglify())
    .on('error',function(err){
        gutil.log(gutil.colors.red('[Error]'),err.toString());
    })
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload())
});

gulp.task('images',function(){
    return gulp.src('src/image/*')
    .pipe(imagemin({
        progressive:true,
        use:[pngquant()]//使用pngquant来压缩png图片
    }))
    .pipe(gulp.dest('dist/image'))
})

//监听
gulp.task('watchs',function(){
    gulp.watch('src/view/*.html',gulp.series('html'));
    gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('src/css/**/*.css', gulp.series('css'));
    gulp.watch('src/js/**/*.js',gulp.series('js'));
});

//清除
gulp.task('clean',function(){
    return del(['dist/*']);
});

//引入
gulp.task('fileinclude',function(){
    return gulp.src('src/view/*.html')
    .pipe(fileinclude({
        prefix:'@@',
        basepath:'@file',
        indent:true
    }))
    .pipe(gulp.dest('src/view'))
})
gulp.task('start',gulp.series(gulp.parallel('watchs','connect','scss','fileinclude')))

gulp.task('build',gulp.series('clean',gulp.parallel('html','scss','css','js','images')));
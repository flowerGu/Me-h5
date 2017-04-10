"use strict";
var path = require('path')
var gulp = require('gulp');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var del = require('del');
var browserSync = require('browser-sync');
var proxy = require('http-proxy-middleware');
var $ = require('gulp-load-plugins')({ lazy: true });

var proxyUrl = {
  test:'http://testapp.mejinrong.com:8023/',//测试环境
  dev:'http://10.10.21.63:8097/', //develop
  mjh:'http://10.10.18.132:8080/',//米金辉
  xxx:'http://10.10.18.123:8080/',
  wp:'http://10.10.18.61:9090/', ///minxin-me-app-backstage-web
  host:'http://me.mejinrong.com',
  lpf:'http://10.10.18.30:8080/'
}.test;

var jsonPlaceholderProxy = proxy('/me-front', {
    target: proxyUrl,
    changeOrigin: true,
    logLevel: 'warn'//['debug', 'info', 'warn', 'error', 'silent']
});

let paths = {
  src: 'src',
  dist:'me-h5'
};

// use this for gulp-plumber
function swallowError(error) {
  // If you want details of the error in the console
  console.error(error.toString());
  this.emit('end');
}

//默认任务，依次执行任务
gulp.task('default', () => {
  runSequence(
    'del:dev',
    'styles',
    'browserSync'
  );
});

gulp.task('build', () => {
  runSequence(
    'del',
    'styles',
    'styles:build',
    'js',
    'images',
    'html',
    'copy'
    // 'browserSync:build'
  );
});

gulp.task('browserSync', function () {

  var options = {
    port: 3000,
    middleware:[jsonPlaceholderProxy],
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'info',
    logPrefix: 'gulp',
    notify: true,
    reloadDelay: 0, // 1000,
    online: false,
    ghostMode: {
      clicks: false,
      location: false,
      forms: false,
      scroll: false
    },
  };

  function serveApp() {

    gulp.watch([ paths.src + '/less/**/*.less' ], ['styles']);

    options.server = {
      baseDir: [
        paths.src + '/html',
        paths.src + '/normal',
        paths.src,
        './dev',
		    './src/doc'
      ]
    };
    options.files = [
      '!' + paths.src + '/less/*.less',
      paths.src + '/**/*',
      './dev/**/*'
    ];
    browserSync(options);
  }

  serveApp();
});
gulp.task('browserSync:build', function () {
  browserSync({
    port: 3000,
    middleware:[jsonPlaceholderProxy],
    server:{
      baseDir:'./me-h5'
    }
  });
});
gulp.task('styles', function () {
  return gulp
    .src([
      paths.src + '/less/*.less',
      paths.src + '/less/plugs/*.less'
    ],{base:paths.src + '/less/'})
    .pipe($.plumber({ errorHandler: swallowError }))
    .pipe($.less({
      paths: [path.join(__dirname, 'src/less')]
    }))
    .pipe($.autoprefixer())
    .pipe($.base64({
      baseDir: 'src/images',
      extensions: ['svg', 'png', /\.jpg#datauri$/i],
      exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
      maxImageSize: 10 * 1024, // 8kb
      debug: false
    }))
    .pipe(gulp.dest('./dev/css'));
});

// todo
gulp.task('vendor',() => {
  return gulp
   .src([
     './node_modules/jquery/me-h5/jquery.min.js',
     './node_modules/mustache/mustache.min.js',
     './node_modules/swiper/me-h5/js/swiper.jquery.min.js',
     './src/js/config/config.js',
     './js/config.js'
    //  './src/js/config/utils.js'

    ])
    .pipe($.concat('vendor.js'))
    .pipe($.rev())
    .pipe(gulp.dest('./dev/js'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('./rev/js'));
});

gulp.task('js', function () {
  var js =  gulp
    .src([
      '!./src/js/inject/**',
      '!./src/js/config/**',
      './src/js/**'
    ])
    // .pipe($.rev())
    // .pipe($.uglify())
    .pipe(gulp.dest('./me-h5/js'))
  // .pipe($.rev.manifest())//
  // .pipe(gulp.dest('./rev/js'));//
  
  // var vendor = gulp
  // .src([
  //   './dev/js/vendor.js'
  // ])
  // .pipe($.rev())
  // .pipe(gulp.dest('./js'))
  // .pipe($.rev.manifest())//
  // .pipe(gulp.dest('./rev/js/lib'));//

  return js;
  // return merge(js,vendor);
});

gulp.task('styles:build', function () {
  return gulp.src([
    './dev/css/**'
  ])
    // .pipe($.rev())
    .pipe($.cssnano())
    .pipe(gulp.dest('./me-h5/css'))
  // .pipe($.rev.manifest())//
  // .pipe(gulp.dest('./rev/css'));//
});

gulp.task('images', function () {
  return gulp
    .src([
      './src/images/**',
      './src/normal/images/**'
    ])
    // .pipe($.imageOptimization({
    //     optimizationLevel: 5,
    //     progressive: true,
    //     interlaced: true
    // }))
    // .pipe($.imagemin({
    //   options:{
    //     optimizationLevel: 3,
    //     progressive: true
    //   },
    //   verbose:true
    // }))
    // .pipe($.rev())
    .pipe(gulp.dest('./me-h5/images'))
  // .pipe($.rev.manifest())//
  // .pipe(gulp.dest('./rev/css'));//
});

gulp.task('html', function () {
  return gulp
    .src([
      // './rev/**/*.json',
      './src/html/*.html'
    ])
    .pipe($.inlineSource())
    // .pipe($.revCollector({
    //   replaceReved: true,
    //   dirReplacements: {
    //     'css': 'css',
    //     'js': 'js',
    //     './css': 'css',
    //     './js': 'js',
    //     '/css/': 'css',
    //     '/js/': 'js'
    //     //  ,'cdn/': function(manifest_value) {
    //     //   return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/images/' + manifest_value;
    //     //  }
    //   }
    // }))
    //.pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe($.if('*.html', gulp.dest('./me-h5')))
});

gulp.task('copy', function () {
  return gulp.src([
    '!src/normal/images/**',
    'src/normal/**/*'
  ])
    .pipe(gulp.dest('./me-h5'));
});

gulp.task('del:dev',()=>{
  return del([
    './dev/**/*'
  ]);
});
gulp.task('del',()=>{
  return del([
    './me-h5/**/*'
  ]);
});

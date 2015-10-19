/* global console */

import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';
import gulpLoadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';

import del from 'del';

const $ = gulpLoadPlugins();
const config = require('./webpack.config.js');
const options = {};

gulp.task('assets', (cb) => gulp.src('src/public/**').pipe(gulp.dest('dist/')).pipe($.size({title: 'assets'})));

gulp.task('clean', (cb) => del(['dist/'], cb));

gulp.task('build', ['clean'], (cb) => {
  const bundler = webpack(config.production);

  bundler.run(function (err, stats) {
    if (err) console.error(err);

    console.log(stats.toString());

    cb();
  });
});

gulp.task('ghpages', ['build'], () => gulp.src('dist/**/*').pipe(ghPages()));

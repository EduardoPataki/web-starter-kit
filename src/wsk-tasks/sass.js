/**
 *
 *  Web Starter Kit
 *  Copyright 2016 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');

const AUTOPREFIXER_BROWSERS = [
  'ie >= 11',
  'ie_mob >= 10',
  'last 2 ff versions',
  'last 2 chrome versions',
  'last 2 edge versions',
  'last 2 safari versions',
  'last 2 opera versions',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

function build() {
  let stream = gulp.src(GLOBAL.config.src + '/**/*.scss')
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS));

  // We only want to minify for production builds
  if (GLOBAL.config.env === 'prod') {
    stream = stream.pipe(cssnano());
  }

  return stream.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(GLOBAL.config.dest));
}

function watch() {
  const watchFunctions = [build];

  // Add the browsersync reload function to the chain if it's available
  if (GLOBAL.config.reload) {
    watchFunctions.push(GLOBAL.config.reload);
  }

  return gulp.watch(GLOBAL.config.src + '/**/*.scss',
    gulp.series(watchFunctions));
}

module.exports = {
  build: build,
  watch: watch
};

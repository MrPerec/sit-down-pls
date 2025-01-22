import { src, dest, series, watch, parallel } from 'gulp';
import { deleteAsync } from 'del';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import image from 'gulp-image';
import svgSprite from 'gulp-svg-sprite';
import terser from 'gulp-terser';
import babel from 'gulp-babel';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import fileinclude from 'gulp-file-include';
import fs from 'fs';

const SRC_DIR = `./src`;
const sass = gulpSass(dartSass);
const isDevMode = process.argv[process.argv.length - 1] === `dev` ? true : false;
const destDir = isDevMode ? `./build_dev` : `./build`;

const htmlInclude = () => {
  return src(`${SRC_DIR}/*.html`)
    .pipe(fileinclude({ prefix: '@@', basepath: '@file' }))
    .pipe(dest(destDir))
    .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src(`${destDir}/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest(destDir))
    .pipe(browserSync.stream());
};

const styles = () => {
  return src(`${SRC_DIR}/sass/style.scss`, { allowEmpty: true })
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(concat(`main.css`))
    .pipe(dest(`${destDir}/css/`, { sourcemaps: isDevMode }))
    .pipe(browserSync.stream());
};

const sprites = () => {
  const config = {
    mode: {
      symbol: { sprite: `../sprite.symbol.svg` },
      view: { bust: false, sprite: `../sprite.view.svg` },
      stack: { sprite: `../sprite.svg` },
    },
  };

  return src(`${SRC_DIR}/svg/*.svg`, { allowEmpty: true })
    .pipe(svgSprite(config))
    .pipe(dest(`${destDir}/img`));
};

const scripts = () => {
  return src(`${SRC_DIR}/js/**/*.js`, { sourcemaps: isDevMode, allowEmpty: true })
    .pipe(babel({ presets: [`@babel/env`] }))
    .pipe(concat(`main.js`))
    .pipe(terser({ toplevel: true }))
    .pipe(dest(`${destDir}/js`), { sourcemaps: isDevMode })
    .pipe(browserSync.stream());
};

const optimizIMG = () => {
  return src([`${SRC_DIR}/img/**/*.{jpg,jpeg,png,svg,gif,ico}`], { encoding: false, allowEmpty: true })
    .pipe(image())
    .pipe(dest(`${destDir}/img/`));
};

const copyIMG = () => {
  const copyFolder = `img`;
  if (!fs.existsSync(`${SRC_DIR}/${copyFolder}`)) {
    console.log(`Папка "${SRC_DIR}/${copyFolder}" отсутствует.`);
    return Promise.resolve();
  }
  return src([`${SRC_DIR}/${copyFolder}/**/*.{jpg,jpeg,png,svg,gif,ico}`], { encoding: false, allowEmpty: true }).pipe(dest(`${destDir}/${copyFolder}/`));
};

const copyFonts = () => {
  const copyFolder = `fonts`;
  if (!fs.existsSync(`${SRC_DIR}/${copyFolder}`)) {
    console.log(`Папка "${SRC_DIR}/${copyFolder}" отсутствует.`);
    return Promise.resolve();
  }
  return src(`${SRC_DIR}/${copyFolder}/**`, { encoding: false, allowEmpty: true }).pipe(dest(`${destDir}/${copyFolder}/`));
};

const copyJson = () => {
  const copyFolder = `json`;
  if (!fs.existsSync(`${SRC_DIR}/${copyFolder}`)) {
    console.log(`Папка "${SRC_DIR}/${copyFolder}" отсутствует.`);
    return Promise.resolve();
  }
  return src(`${SRC_DIR}/${copyFolder}/**/*.json`, { encoding: false, allowEmpty: true }).pipe(dest(`${destDir}/${copyFolder}/`));
};

const copyLibs = () => {
  const copyFolder = `libs`;
  if (!fs.existsSync(`${SRC_DIR}/${copyFolder}`)) {
    console.log(`Папка "${SRC_DIR}/${copyFolder}" отсутствует.`);
    return Promise.resolve();
  }
  return src(`${SRC_DIR}/${copyFolder}/**`, { allowEmpty: true }).pipe(dest(`${destDir}/${copyFolder}/`));
};

const copyPhpmailer = () => {
  const copyFolder = `phpMailer`;
  if (!fs.existsSync(`${SRC_DIR}/${copyFolder}`)) {
    console.log(`Папка "${SRC_DIR}/${copyFolder}" отсутствует.`);
    return Promise.resolve();
  }
  return src(`${SRC_DIR}/${copyFolder}/**`, { allowEmpty: true }).pipe(dest(`${destDir}/${copyFolder}/`));
};

const clean = () => deleteAsync(`${destDir}/*`);

const toWatch = () => {
  browserSync.init({ server: { baseDir: destDir } });

  watch(`${SRC_DIR}/img/**/*.{jpg,jpeg,png,svg,gif,ico}`, copyIMG);
  watch(`${SRC_DIR}/fonts/**`, copyFonts);
  watch(`${SRC_DIR}/json/**/*.json`, copyJson);
  watch(`${SRC_DIR}/libs/**`, copyLibs);
  watch(`${SRC_DIR}/phpMailer/**`, copyPhpmailer);
  watch(`${SRC_DIR}/svg/*.svg`, sprites);
  watch(`${SRC_DIR}/sass/**/*.scss`, styles);
  watch(`${SRC_DIR}/js/**/*.js`, scripts);
  watch(`${SRC_DIR}/**/*.html`, htmlInclude);
  watch(`${SRC_DIR}/**/*.html`, htmlMinify);
};

const dev = series(clean, htmlInclude, parallel(copyFonts, copyLibs, copyPhpmailer, copyIMG, copyJson), parallel(sprites, styles, scripts), htmlMinify, toWatch);
const build = series(clean, htmlInclude, parallel(copyFonts, copyLibs, copyPhpmailer, optimizIMG, copyJson), parallel(sprites, styles, scripts), htmlMinify);

export { dev, build };

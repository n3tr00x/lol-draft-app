import gulp from 'gulp';
import babel from 'gulp-babel';
import htmlReplace from 'gulp-html-replace';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import { createGulpEsbuild } from 'gulp-esbuild';
import gulpSass from 'gulp-sass';
import * as scss from 'sass';
import { deleteSync } from 'del';
import { create } from 'browser-sync';

const { src, dest, watch, series, parallel } = gulp;
const esbuild = createGulpEsbuild({
	piping: true,
});
const sass = gulpSass(scss);
const browserSync = create();

const paths = {
	src: {
		jsRoot: 'src/js/index.js',
		js: 'src/js/**/*.js',
		html: 'src/**/*.html',
		css: 'src/scss/**/*.scss',
	},
	dist: {
		root: 'dist',
	},
};

const jsDev = () => {
	return src(paths.src.js).pipe(dest(paths.dist.js));
};

const jsProd = () => {
	return src(paths.src.jsRoot)
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(
			esbuild({
				outfile: 'bundle.js',
				bundle: true,
				minify: true,
			})
		)
		.pipe(dest(paths.dist.root));
};

const cssDev = () => {
	return src(paths.src.css)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.dist.root))
		.pipe(browserSync.stream());
};

const cssProd = () => {
	return src(paths.src.css)
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(autoprefixer())
		.pipe(dest(paths.dist.root));
};

const htmlDev = () => {
	return src(paths.src.html).pipe(dest(paths.dist.root));
};

const htmlProd = () => {
	return src(paths.src.html)
		.pipe(
			htmlReplace({
				js: {
					src: './bundle.js',
					tpl: '<script src="%s" defer></script>',
				},
			})
		)
		.pipe(dest(paths.dist.root));
};

const clean = done => {
	deleteSync([paths.dist.root]);
	done();
};

const server = done => {
	browserSync.init({
		server: {
			baseDir: paths.dist.root,
		},
		notify: false,
	});

	watch(paths.src.js, series(javascript, reload));
	watch(paths.src.css, series(css, reload));
	watch(paths.src.html, series(html, reload));

	done();
};

const reload = done => {
	browserSync.reload();
	done();
};

export default series(clean, parallel(jsDev, cssDev, htmlDev), server);

export const build = series(clean, parallel(jsProd, cssProd, htmlProd));

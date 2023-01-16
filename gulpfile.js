const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const server = done => {
	browserSync.init({
		server: {
			baseDir: './dist',
		},
		notify: false,
	});
	done();
};

const reload = done => {
	browserSync.reload();
	done();
};

const css = () => {
	return src('src/scss/main.scss', { sourcemaps: true })
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(dest('dist/css', { sourcemaps: '.' }))
		.pipe(browserSync.stream());
};

const cssForProd = () => {
	return src('src/scss/main.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream());
};

const html = () => {
	return src('src/index.html').pipe(dest('dist'));
};

const js = () => {
	return src('src/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(terser())
		.pipe(sourcemaps.write('.'))
		.pipe(dest('dist/js'));
};

const jsForProd = () => {
	return src('src/js/**/*.js').pipe(terser()).pipe(dest('dist/js'));
};

const watchTasks = () => {
	watch('src/*.html', series(html, reload));
	watch(['src/scss/**/*.scss', 'src/js/**/*.js'], series(css, js, reload));
};

exports.dev = series(css, js, html, server, watchTasks);
exports.prod = series(cssForProd, jsForProd, html, server);

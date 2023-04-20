const generateJsonIcons = require('./tasks/iconsBuild');

const fs = require('fs');
const path = require('path');
const { src, dest, watch, parallel, series } = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
const concat = require('gulp-concat');
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const del = require('del');
const gcmq = require('gulp-group-css-media-queries');
const twig = require('gulp-twig');
var data = require('gulp-data');
const htmlbeautify = require('gulp-html-beautify');

function formaterHtml() {
	return src('app/*.html')
		.pipe(htmlbeautify({
			indentSize: 2,
			"preserve_newlines": false,
			"max_preserve_newlines": 1,
		}))
		.pipe(dest('dist'))
}

function compile() {
	const params = {
		base: path.resolve(__dirname, 'app/templates/includes'),
		errorLogToConsole: true,
	};

	const generalJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'app/data/_.json')));

	return src([
		'./app/templates/*.twig'
	])
		.pipe(data(function (file) {
			let json;

			if (fs.existsSync(path.join(__dirname, 'app/data/') + path.parse(file.path).name + '.json')) {
				json = JSON.parse(fs.readFileSync(path.join(__dirname, 'app/data/') + path.parse(file.path).name + '.json'));
			} else {
				fs.writeFileSync(
					path.join(__dirname, 'app/data/') + path.parse(file.path).name + '.json',
					'{}',
					'utf8',
					(err, data) => {
						console.error(err, data);
					}
				)
			}

			return Object.assign({}, generalJson, json);
		}))
		.pipe(twig(params))
		.pipe(dest('app/'))
		.pipe(browserSync.stream());
}

function svgSpritesUI() {
	generateJsonIcons();

	return src('app/assets/img/icons/sprite/kit/*.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../sprite.svg'
				}
			}
		}))
		.pipe(dest('app/assets/img/icons/sprite'))
}

function browsersync() {
	browserSync.init({
		server: {
			baseDir: "./app/"
		}
	});
}

function cleanDist() {
	return del('dist')
}

function images() {
	return src('app/assets/img/**/*')
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 80, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest('dist/assets/img'))
}

function scripts() {
	return (
		browserify({
			entries: [path.join(__dirname, './app/assets/js/index.js')],
			debug: false
		})
		.transform(babelify.configure({
			presets: ["@babel/preset-env"],
			sourceMaps: false,
			sourceMapsAbsolute: false
		}))
		.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
		.pipe(dest('app/assets/js'))
		.pipe(browserSync.stream())
		)
}

function scriptsBuild() {
	return browserify({
			entries: [path.join(__dirname, './app/assets/js/index.js')],
			debug: false
		})
		.transform(babelify.configure({
			presets: ["@babel/preset-env"],
			sourceMaps: false,
			sourceMapsAbsolute: false
		}))
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(dest('dist/assets/js'));
}

function styles() {
	return src('app/assets/style/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(scss())
		.pipe(concat('style.css'))
		.pipe(sourcemaps.write())
		.pipe(dest('app/assets/style'))
		.pipe(browserSync.stream());
}

function stylesBuild() {
	return src('app/assets/style/scss/main.scss')
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(concat('style.css'))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 5 version'],
			grid: true
		}))
		.pipe(dest('dist/assets/style'));
}

function build() {
	return src([
		'app/assets/fonts/**/*',
		'app/assets/style/css/libs/**/*',
		'app/assets/js/libs/**/*',
		'app/assets/vendors/**/*',
	], { base: 'app' })
		.pipe(dest('dist'))
}

function watching() {
	watch(['app/assets/style/scss/**/*.scss'], styles);
	watch(['app/templates/**/*.twig', 'app/data/**/*.json'], compile);
	watch(['app/assets/js/**/*.js', '!app/assets/js/main.js'], scripts);
	watch(['app/assets/img/icons/sprite/kit/*.svg'], svgSpritesUI);
}

exports.compile = compile;
exports.formaterHtml = formaterHtml;
exports.styles = styles;
exports.stylesBuild = stylesBuild;
exports.scriptsBuild = scriptsBuild;
exports.svgSpritesUI = svgSpritesUI;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, compile, formaterHtml, images, build, stylesBuild, scriptsBuild);

exports.default = parallel(compile, styles, scripts, svgSpritesUI, browsersync, watching);
'use strict';

var config = require('webpack.config');
var gutil = require('gulp-util');
var gulp = require('gulp');
var nodefn = require('when/node');
var server = require('test/server');
var webpack = require('webpack');
var spawn = require('child_process').spawn;
var notifier = require('node-notifier');
var startTestServer;
var stopTestServer;
var webpackRun;
var runTests;

function notifyBuildFailed () {
	notifier.notify({
		title: 'Build failed',
		message: 'see console for details',
		sound: true,
		icon: __dirname + '/test/notifications/bad.png'
	});
}

function notifyBuildPassed () {
	notifier.notify({
		title: 'Build complete',
		message: 'see console for details',
		icon: __dirname + '/test/notifications/good.png'
	});
}

function notifyTestsFailed (err) {
	var notification = {
		title: 'Tests failed',
		sound: true,
		icon: __dirname + '/test/notifications/bad.png'
	};

	if(err.url) {
		notification.message = 'Click to view in browser';
		notification.open = err.url;
	}

	notifier.notify(notification);
}

function notifyTestsPassed () {
	notifier.notify({
		title: 'Tests passed',
		message: 'see console for details',
		icon: __dirname + '/test/notifications/good.png'
	});
}

function notifyTestBuildFailed () {
	notifier.notify({
		message: 'Test build failed',
		sound: true,
		icon: __dirname + '/test/notifications/bad.png'
	});
}

process.env.NODE_PORT = process.env.NODE_PORT || 21113;

runTests = nodefn.lift(function (callback) {
	var errBuf = '';
	var url = 'http://localhost:' + process.env.NODE_PORT + '/index.html';
	var child;

	try {
		gutil.log('Starting unit tests');

		child = spawn('./node_modules/.bin/mocha-phantomjs', [
			'-R', 
			'spec',
			url 
		]);
		
		child.stdout.on('data', function (data) {
			errBuf += data.toString();
		});

		child.stderr.on('data', function (data) {
			errBuf += gutil.colors.red(data.toString());
		});

		child.on('exit', function (code) {
			var err = null;
			gutil.log(errBuf);
			gutil.log(gutil.colors.blue('Mocha exited with code ' + code));
			
			//non zero! bad!
			if(code) {
				err = new Error('Client tests failed');
				err.url = url;
			}
			gutil.log('Unit tests finished');
			callback(err);
		});
	}
	catch (err) {
		callback(err);
	}
});

startTestServer = nodefn.lift(function (callback) {
	gutil.log('Starting test server on port ' + process.env.NODE_PORT);
	server.start(process.env.NODE_PORT, callback);
});

stopTestServer = nodefn.lift(function (callback) {
	gutil.log('Stopping test server on port ' + process.env.NODE_PORT);
	server.stop(callback);
});

webpackRun = nodefn.lift(nodefn.lift(webpack));

gulp.task('dev', function (callback) {
	process.env.NODE_ENV = 'development';
	
	config.forEach(function (config) {
		config.devtool = 'source-map';
		config.debug = true;
	});

	webpackRun(config)
		.then(startTestServer(), notifyBuildFailed)
		.then(runTests())
		.then(notifyTestsPassed, notifyTestsFailed)		
		.ensure(stopTestServer())
		.done(callback);
});

gulp.task('prod', function (callback) {
	process.env.NODE_ENV = 'production';
	
	config.forEach(function (config) {
		config.optimize = true;
	});

	webpackRun(config)
		.then(startTestServer(), notifyBuildFailed)
		.then(runTests())
		.then(notifyTestsPassed, notifyTestsFailed)		
		.ensure(stopTestServer())
		.done(callback);
});

gulp.task('watch', function (callback) {
	var compiler;
	var testCompiler;

	process.env.NODE_ENV = 'development';

	config.forEach(function (config) {
		config.devtool = 'source-map';
		config.debug = true;
	});
	
	compiler = webpack(config[0]);
	testCompiler = webpack(config[1]);

	startTestServer().ensure(function () {
		compiler.watch(200, function (err, stats) {
			if(err) {
				notifyBuildFailed(err);
			}
			else {
				var jsonStats = stats.toJson();	
				
				if(jsonStats.warnings.length > 0) {
					jsonStats.warnings.forEach(function (warning) {
						gutil.log(gutil.colors.yellow('WARN: ') + warning);
					});
				}

				if(jsonStats.errors.length > 0) {
					jsonStats.errors.forEach(function (error) {
						gutil.log(gutil.colors.red('ERROR: ') + error);
					});

					notifyBuildFailed();
				}
				else {
					notifyBuildPassed();
				}
			}
		});

		testCompiler.watch(200, function (err, stats) {
			if(err) {
				notifyTestBuildFailed();
			}
			else {
				var jsonStats = stats.toJson();	
					
				if(jsonStats.warnings.length > 0) {
					jsonStats.warnings.forEach(function (warning) {
						gutil.log(gutil.colors.yellow('WARN: ' + warning));
					});
				}

				if(jsonStats.errors.length > 0) {
					jsonStats.errors.forEach(function (error) {
						gutil.log(gutil.colors.yellow('ERROR: ' + error));
					});

					notifyTestBuildFailed();
				}
				else {
					runTests().done(notifyTestsPassed, notifyTestsFailed);
				}
			}
		});
	});
});


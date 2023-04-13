/**
* ownCloud
*
* @author Vincent Petry
* @copyright 2016 Vincent Petry <pvince81@owncloud.com>
*
* This library is free software; you can redistribute it and/or
* modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
* License as published by the Free Software Foundation; either
* version 3 of the License, or any later version.
*
* This library is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU AFFERO GENERAL PUBLIC LICENSE for more details.
*
* You should have received a copy of the GNU Affero General Public
* License along with this library.  If not, see <http://www.gnu.org/licenses/>.
*
*/

/**
 * This node module is run by the karma executable to specify its configuration.
 */

/* jshint node: true */
module.exports = function(config) {
	var _ = require('underscore');
	var basePath = '../../';
	var ownCloudPath = '../../';

	// can't use wildcard due to loading order
	var srcFiles = _.map(require(basePath + 'js/modules.json'), function(name) {
		return 'js/' + name + '.js';
	});

	var testFiles = [
		'tests/js/*.js'
	];

	var coreModules = require(ownCloudPath + '../../core/js/core.json');
	var coreLibs = [
		ownCloudPath + 'core/js/tests/lib/sinon-1.15.4.js',
		ownCloudPath + 'core/js/tests/specHelper.js'
	];

	coreLibs = coreLibs.concat(coreModules.vendor.map(function prependPath(path) {
		return ownCloudPath + 'core/vendor/' + path;
	}));

	coreLibs = coreLibs.concat(coreModules.modules.map(function prependPath(path) {
		return ownCloudPath + 'core/js/' + path;
	}));

	coreLibs = coreLibs.concat(coreModules.libraries.map(function prependPath(path) {
		return ownCloudPath + 'core/js/' + path;
	}));

	var files = [].concat(coreLibs, srcFiles, testFiles);

	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: basePath,

		// frameworks to use
		frameworks: ['jasmine', 'jasmine-sinon'],

		// list of files / patterns to load in the browser
		files: files,

		// list of files to exclude
		exclude: [

		],

		proxies: {
		},

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['progress'],

		junitReporter: {
			outputFile: 'tests/js/results-js.xml'
		},

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera (has to be installed with `npm install karma-opera-launcher`)
		// - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
		// - PhantomJS
		// - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
		browsers: ['ChromeHeadlessNoSandbox'],
		customLaunchers: {
			ChromeHeadlessNoSandbox: {
				base: 'ChromeHeadless',
				flags: ['--no-sandbox']
			}
		},

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000,

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false
  });
};

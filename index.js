'use strict';

const main = {};

if (process.env.CI) {
	if (process.argv.includes('report')) {
		main.reporter = ['text-lcov'];
	} else {
		main.reporter = ['text'];
	}
} else {
	main['temp-directory'] = 'coverage/.nyc_output';
	main.reporter = ['html', 'text'];
}

module.exports = main;

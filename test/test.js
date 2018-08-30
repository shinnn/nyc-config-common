'use strict';

const {join} = require('path');
const {lstat} = require('fs').promises;
const {promisify} = require('util');

const getStdout = require('execa').stdout;
const rimraf = require('rimraf');
const test = require('tape');

const path = require.resolve('./run.js');
const promisifiedRimraf = promisify(rimraf);

test('nyc-config-common on CI', async t => {
	process.env.CI = 'true';
	await promisifiedRimraf('{.nyc_output,coverage}');

	t.ok(
		(await getStdout('nyc', ['node', path])).includes('All files'),
		'should print coverage report to stdout.'
	);

	try {
		await lstat(join(__dirname, '..', 'coverage'));
		t.fail('Unexpectedly succeeded.');
	} catch ({code}) {
		t.equal(
			code,
			'ENOENT',
			'should avoid writing HTML reports to the disk.'
		);
	}

	t.ok(
		(await lstat(join(__dirname, '..', '.nyc_output'))).isDirectory(),
		'should write raw coverage information files to the default path.'
	);

	t.ok(
		(await getStdout('nyc', ['report'])).endsWith('end_of_record'),
		'should set the default reporter of `report` subcommand to `text-lcov`.'
	);

	t.end();
});

test('nyc-config-common on a non-CI environment', async t => {
	delete process.env.CI;
	await promisifiedRimraf('{.nyc_output,coverage}');

	t.ok(
		(await getStdout('nyc', ['node', path])).includes('All files'),
		'should print coverage report to stdout.'
	);

	t.ok(
		(await lstat(join(__dirname, '..', 'coverage', 'index.html'))).isFile(),
		'should produce HTML report to the disk.'
	);

	t.ok(
		(await lstat(join(__dirname, '..', 'coverage', '.nyc_output'))).isDirectory(),
		'should write raw coverage information files to `coverage` directory.'
	);

	try {
		await lstat(join(__dirname, '..', '.nyc_output'));
		t.fail('Unexpectedly succeeded.');
	} catch ({code}) {
		t.equal(
			code,
			'ENOENT',
			'should avoid writing raw coverage information to the default path.'
		);
	}

	t.end();
});

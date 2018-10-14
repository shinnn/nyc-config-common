# nyc-config-common

[![npm version](https://img.shields.io/npm/v/nyc-config-common.svg)](https://www.npmjs.com/package/nyc-config-common)
[![Build Status](https://travis-ci.com/shinnn/nyc-config-common.svg?branch=master)](https://travis-ci.com/shinnn/nyc-config-common)

A reusable [nyc](https://github.com/istanbuljs/nyc) configuration to improve common workflow

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```
npm install --save-dev nyc-config-common
```

## Usage

[Include](https://github.com/istanbuljs/nyc#publish-and-reuse-your-nyc-configuration) this package to the project's `nyc` configuration.

```json
{
  "nyc": {
    "extends": "nyc-config-common"
  }
}
```

Then `nyc` command uses the better default settings whenever it's run, as described below:

### On non-[CI](https://www.martinfowler.com/articles/continuousIntegration.html) environments

* Runs both [`html` and `text` reporter](https://github.com/istanbuljs/nyc#running-reports) in every `nyc` execution
* Writes raw coverage information to `coverage` directory where HTML reports are also saved, instead of the default `.nyc_output`
  * So that users don't need to include `.nyc_output` to their [`.gitignore`](https://git-scm.com/docs/gitignore)

### On CI

For example [Travis CI](https://docs.travis-ci.com/user/getting-started) and [AppVeyor](https://www.appveyor.com/)

* Uses `text-lcov` reporter by default while executing `report` subcommand
  * In most case `nyc report` is expected to print LCOV on CI to integrate [coverage](https://coveralls.io/) [report](https://codecov.io/) services

## License

[ISC License](./LICENSE) © 2018 Shinnosuke Watanabe

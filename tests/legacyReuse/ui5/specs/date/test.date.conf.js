const path = require("path");
const merge = require("deepmerge");
const qmateConfigure = require("../../../configurations/chrome.headless.conf.js");
exports.config = merge(qmateConfigure.config, {
  // maxInstances: 6,
  // bail: 1,
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //

  specs: [
    // path.resolve(__dirname, "pickDate.spec.js"),
    // path.resolve(__dirname, "pickDateRange.spec.js"),
    path.resolve(__dirname, "fillDateRange.spec.js"),
    // path.resolve(__dirname, "getToday.spec.js"),
    // path.resolve(__dirname, "getTomorrow.spec.js"),
    // path.resolve(__dirname, "getNextMonth.spec.js"),
    // path.resolve(__dirname, "getPreviousMonth.spec.js"),
    // path.resolve(__dirname, "getNextYear.spec.js"),
    // path.resolve(__dirname, "getPreviousYear.spec.js"),
    // path.resolve(__dirname, "calculateDate.spec.js"),
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  //
  // The number of times to retry the entire specfile when it fails as a whole
  //specFileRetries: 1,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter.html
  // reporters: ["spec"],
  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    timeout: 2000000,
  },
});
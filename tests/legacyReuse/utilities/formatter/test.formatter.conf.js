const path = require("path");
const merge = require("deepmerge");
const qmateConfig = require("../../../helper/configurations/report.headless.conf.js");
exports.config = merge(qmateConfig.config, {
  maxInstances: 1,
  bail: 1,

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
    path.resolve(__dirname, "extractNumberFromString.spec.js"),
    path.resolve(__dirname, "formatDate.spec.js")
  ],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: "https://sapui5.hana.ondemand.com/1.99.0/",
});

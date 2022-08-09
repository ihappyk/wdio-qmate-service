const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/chrome.headless.conf");
exports.config = merge(qmateConfiguration.config, {
  maxInstances: 6,
  specFileRetries: 2,
  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html",

  specs: [
    path.resolve(__dirname, "clickOk.spec.js"),
    path.resolve(__dirname, "clickCancel.spec.js"),
    path.resolve(__dirname, "clickYes.spec.js"),
    path.resolve(__dirname, "clickNo.spec.js"),
    path.resolve(__dirname, "clickDelete.spec.js"),
    path.resolve(__dirname, "clickRevokeApproval.spec.js"),
    path.resolve(__dirname, "clickCreate.spec.js"),
  ],

  exclude: [],

  mochaOpts: {
    timeout: 2000000,
  },
});
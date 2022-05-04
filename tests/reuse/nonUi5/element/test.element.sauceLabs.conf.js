const path = require("path");
const merge = require("deepmerge");
const qmateConfiguration = require("../../../helper/configurations/sauce.labs.conf");
exports.config = merge(qmateConfiguration.config, {
  user: "sso-sap-D056896",
  key: "dbdea161-6aad-42aa-a0ae-296a3bd322ef",
  region: "eu-central-1",

  maxInstances: 5,
  bail: 1,
  baseUrl: "https://sapui5.hana.ondemand.com/1.99.0/test-resources/sap/m/demokit/cart/webapp/index.html",

  specs: [
    path.resolve(__dirname, "waitToBePresent.spec.js"),
    path.resolve(__dirname, "getAllDisplayed.spec.js"),
    path.resolve(__dirname, "waitForAll.spec.js"),
    path.resolve(__dirname, "waitToBeVisible.spec.js"),
    path.resolve(__dirname, "waitToBeClickable.spec.js"),
    path.resolve(__dirname, "getByCss.spec.js"),
    path.resolve(__dirname, "getById.spec.js"),
    path.resolve(__dirname, "getByClass.spec.js"),
    path.resolve(__dirname, "getByXPath.spec.js"),
    path.resolve(__dirname, "getAttributeValue.spec.js"),
    path.resolve(__dirname, "getValue.spec.js"),
    path.resolve(__dirname, "getByChild.spec.js"),
    path.resolve(__dirname, "getByParent.spec.js"),
    path.resolve(__dirname, "highlight.spec.js"),
    path.resolve(__dirname, "switchToIframe.spec.js"),
    path.resolve(__dirname, "switchToWindow.spec.js"),
    path.resolve(__dirname, "switchToNewWindow.spec.js"),
    path.resolve(__dirname, "getCurrentWindow.spec.js"),
    path.resolve(__dirname, "getByName.spec.js"),
    path.resolve(__dirname, "getByCssContainingText.spec.js"),
    path.resolve(__dirname, "isVisible.spec.js"),
    path.resolve(__dirname, "isPresent.spec.js"),
    path.resolve(__dirname, "isPresent.spec.js"),
    path.resolve(__dirname, "isPresentByCss.spec.js"),
    path.resolve(__dirname, "isPresentByXPath.spec.js")
  ],

  exclude: [],

  services: [
    ["chromedriver", {
      port: 4444
    }],
    ["static-server", {
      port: 34005,
      folders: [
        { mount: "/waitForElements.html", path: path.resolve(__dirname, "../../../helper/website/waitForElements.html") },
        { mount: "/buttons.html", path: path.resolve(__dirname, "../../../helper/website/buttons.html") },
        { mount: "/checkBox.html", path: path.resolve(__dirname, "../../../helper/website/checkBox.html") },
        { mount: "/dropdown.html", path: path.resolve(__dirname, "../../../helper/website/dropdown.html") },
        { mount: "/forms.html", path: path.resolve(__dirname, "../../../helper/website/forms.html") },
        { mount: "/scrollPage.html", path: path.resolve(__dirname, "../../../helper/website/scrollPage.html") },
        { mount: "/hiddenAndVisible.html", path: path.resolve(__dirname, "../../../helper/website/hiddenAndVisible.html") },
        { mount: "/tables.html", path: path.resolve(__dirname, "../../../helper/website/tables.html") }
      ]
    }]
  ],
});
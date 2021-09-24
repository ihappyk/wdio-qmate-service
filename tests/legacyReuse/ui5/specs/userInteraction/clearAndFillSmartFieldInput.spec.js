const { handleCookiesConsent } = require("../../../utils");

describe("userInteraction - clearAndFillSmartFieldInput", function () {

  let value;
  let valueAct;
  let selector;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.Overview");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smartfield.Overview.Main",
        "metadata": "sap.m.Input",
        "value": [{
          "path": "Quantity"
        }]
      }
    };

    value = "375";
    const index = 0;
    const timeout = 30000;
    const attribute = "value";

    await ui5.common.userInteraction.clearAndFillSmartFieldInput(selector, value, index, timeout);

    const textArea = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smartfield.Overview.Main",
        "metadata": "sap.m.TextArea"
      }
    };
    await ui5.common.userInteraction.click(textArea);
    await ui5.common.userInteraction.click(selector);
    valueAct = await ui5.common.locator.getValue(selector, attribute, index, timeout);
  });

  it("Verification", function () {
    ui5.common.assertion.expectEqual(value, valueAct);
  });
});

describe("userInteraction - clearAndFillSmartFieldInput with invalid selector", function () {

  let value;
  let selector;

  it("Preparation", async function () {
    await browser.navigateTo("https://sapui5.hana.ondemand.com/#/entity/sap.ui.comp.smartfield.SmartField/sample/sap.ui.comp.sample.smartfield.Overview");
    await handleCookiesConsent();
  });

  it("Execution and Verification", async function () {
    selector = {
      "elementProperties": {
        "viewName": "sap.ui.comp.sample.smartfield.Overview.Main",
        "metadata": "sap.ui.comp.smartfierr",
        "value": [{
          "path": "Quantity"
        }]
      }
    };
    value = "12";
    const index = 0;
    const timeout = 50000;
    await expect(ui5.common.userInteraction.clearAndFillSmartFieldInput(selector, value, index, timeout))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
  });
});
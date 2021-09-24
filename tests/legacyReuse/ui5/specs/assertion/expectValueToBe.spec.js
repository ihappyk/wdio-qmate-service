"use strict";

describe("assertion - expectValueToBe", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    const input = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.SearchField",
        "id": "*searchField"
      }
    };
    await ui5.common.userInteraction.fill(input, "Watch");
    await ui5.common.assertion.expectValueToBe(input, "Watch");
  });
});

describe("assertion - expectValueToBe with wrong value input (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    const input = {
      "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.SearchField",
        "id": "*searchField"
      }
    };
    await ui5.common.userInteraction.fill(input, "Wtch");
    await expect(ui5.common.assertion.expectValueToBe(input, "Watch"))
      .rejects.toThrow(/Expect\w+|\d+Watch\w+|\d+Received\w+|\d+Wtch/);
  });
});

describe("assertion - expectValueToBe with wrong selector (unhappy case)", function () {
  it("Preparation", async function () {
    await browser.url("#/categories");
  });

  it("Execution and Verification", async function () {
    const wrongSelector = {
      "elementProperties": {
        "wrongData": "123"
      }
    };
    await expect(ui5.common.assertion.expectValueToBe(wrongSelector, "Watch"))
      .rejects.toThrow(/uiControlExecuteLocator\(\): No visible elements found/);
    wrongSelector = 123;
    await expect(ui5.common.assertion.expectValueToBe(wrongSelector, "Watch"))
      .rejects.toThrow("waitUntil condition failed with the following reason: javascript error: Cannot read properties of null (reading 'getMetadata')");
  });
});
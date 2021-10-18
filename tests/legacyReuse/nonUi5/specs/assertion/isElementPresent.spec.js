"use strict";
describe("assertion - isElementPresent for list item element", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const itemElement = await nonUi5.element.getElementByCss(".sapMSLITitleOnly=Computer System Accessories");
    const isPresent = await non_ui5.common.assertion.isElementPresent(itemElement);
    await non_ui5.common.assertion.expectTrue(isPresent);
  });
});


describe("assertion - isElementPresent for hidden element", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    const hiddenElements = await non_ui5.common.locator.waitForAllElements(".sapUiInvisibleText");
    non_ui5.common.assertion.expectDefined(hiddenElements);
    non_ui5.common.assertion.expectDefined(hiddenElements.length);
    const isPresent = await non_ui5.common.assertion.isElementPresent(hiddenElements[0]);
    await non_ui5.common.assertion.expectTrue(isPresent);
  });
});


describe("assertion - isElementPresent for wrong element", function () {
  it("Preparation", async function () {
    await non_ui5.common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(non_ui5.common.assertion.isElementPresent(".sapUiInvisibleText"))
      .rejects.toThrow(/not a function/);
  });
});

"use strict";

describe("locator - getByClass + expectToBeVisible", function () {

  let downloadBtn;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution", async function () {
    downloadBtn = await nonUi5.element.getByClass("sapMPageSubHeader");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(downloadBtn, 10000);
  });
});

describe("locator - getByClass - multiple classes", function () {

  let downloadBtn;

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution", async function () {
    downloadBtn = await nonUi5.element.getByClass("sapMPage sapMPageBgSolid sapMPageWithHeader sapMPageWithSubHeader sapMPageBusyCoversAll");
  });

  it("Verification", async function () {
    await nonUi5.assertion.expectToBeVisible(downloadBtn, 10000);
  });
});

describe("locator - getByClass and catch error", function () {

  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html#/categories");
  });

  it("Execution and Verification", async function () {
    await expect(nonUi5.element.getByClass("sapMPSubHeader"))
      .rejects.toThrow("Function 'getByClass' failed");
  });
});
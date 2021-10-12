"use strict";

const { handleCookiesConsent } = require("../../../helper/utils");

describe("userInteraction - Double click on Switch button", async function () {
  it("Preparation", async function () {
    await common.navigation.navigateToUrl("https://sapui5.hana.ondemand.com/#/entity/sap.m.Select/sample/sap.m.sample.Select");
    await handleCookiesConsent();
  });

  it("Execution", async function () {
    const elem = await nonUi5.element.getElementByCss("SECTION:nth-child(2) > DIV:nth-child(1) > DIV:nth-child(2) > DIV:nth-child(1) > DIV:nth-child(2) > DIV:nth-child(1) > DIV:nth-child(1)");
    await nonUi5.userInteraction.doubleClick(elem);
  });

  it("Verification", async function () {
    const elem = await nonUi5.element.getElementByCss("DIV[class='sapMSlt sapMSltDefault sapMSltMinWidth sapMSltHoverable sapMSltWithArrow']");
    await nonUi5.assertion.expectToBeVisible(elem);
  });
});
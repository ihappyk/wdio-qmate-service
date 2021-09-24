"use strict";
// Note: need to dynamically switch base urls in the spec as we run tests against multiple systems

describe("session - loginFiori", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
    await common.navigation.navigateToUrl(browser.config.baseUrl);
  });

  it("Execution", async function () {
    await ui5.session.loginFiori("PURCHASER");
    await ui5.navigation.navigateToApplication("Shell-home", true);
    await ui5.navigation.closePopups();
  });

  it("Verification", async function () {
    const selector = {
      "elementProperties": {
        "metadata": "sap.ushell.ui.shell.ShellAppTitle",
        "id": "shellAppTitle"
      }
    };
    await ui5.assertion.expectToBeVisible(selector);
  });
});

describe("session - loginFiori for Sap Cloud login", function () {
  it("Preparation", async function () {
    util.browser.setBaseUrl("https://super-sensitive.domain.name/ui");
    await ui5.navigation.navigateToApplication("", true);
  });

  it("Execution and Verification", async function () {
    await expect(ui5.session.loginFiori("PURCHASER"))
      .rejects.toThrow(/Function 'loginFiori' failed/);
  });
});
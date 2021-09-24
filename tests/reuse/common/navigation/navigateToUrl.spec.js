describe("navigateToUrl", function () {

  const url = "https://sapui5.hana.ondemand.com/";

  it("Execution", async function () {
    await common.navigation.navigateToUrl(url);
  });

  it("Execution and Verification", async function () {
    await common.assertion.expectUrlToBe(url);
  });
});

describe("navigateToUrl with wrong url", function () {

  it("Execution and Verification", async function () {
    await expect(common.navigation.navigateToUrl("sd"))
      .rejects.toThrow("invalid argument");
  });
});

describe("navigateToUrl with wrong parameter", function () {

  it("Execution and Verification", async function () {
    await expect(common.navigation.navigateToUrl())
      .rejects.toThrow("Function 'navigateToUrl' failed: Please provide an url as argument.");
  });
});
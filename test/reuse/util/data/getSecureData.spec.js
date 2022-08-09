describe("data - getSecureData", function() {

  let data;

  it("Execution", function () {
    data = util.data.getSecureData("test");
  });

  it("Verification (1)", function () {
    const dataExp = "super-duper-sensitive-pw";
    const dataAct = data.session.password;
    common.assertion.expectEqual(dataAct, dataExp);
  });

  it("Verification (2)", function () {
    const dataExp = 42;
    const dataAct = data.test.number;
    common.assertion.expectEqual(dataAct, dataExp);
  });

  it("Verification (3)", function () {
    const dataExp = "TEST";
    const dataAct = data.test.inner.value;
    common.assertion.expectEqual(dataAct, dataExp);
  });

});

// =================================== KEEP DISABLED ===================================
// Can't be executed in pipeline because file is missing. Add the following to "data" folder to execute locally:

// test.local.json
// {
//   "session": {
//     "password": "super-duper-sensitive-pw"
//   }
// }

// describe("data - getSecureData - local fallback", function() {

//   let data;

//   it("Preparation", function () {
//     process.env.PRIVATEKEY_FOUND = false;
//   });

//   it("Execution", function () {
//     data = util.data.getSecureData("test");
//   });

//   it("Verification", function () {
//     const dataExp = "super-duper-sensitive-pw";
//     const dataAct = data.session.password;
//     common.assertion.expectEqual(dataAct, dataExp);
//   });
// });
// =======================================================================================
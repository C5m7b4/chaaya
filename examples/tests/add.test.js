const { add } = require("../src/add");
const { divide } = require("../src/divide");

class TestClass {
  constructor() {
    console.log("i hae been created");
  }

  test() {
    console.log("test function called");
  }
}

describe("add function", () => {
  it("should return 2 when given (1,1)", () => {
    expect(add(1, 1)).toEqual(3);
  });
  it.skip("should return 4 when given(1,3)", () => {
    expect(add(1, 3)).toBe(5);
  });
});

describe("only test", () => {
  beforeEach(function () {
    const myTest = new TestClass();
    return myTest;
  });
  it.skip("should return true", () => {
    //myTest.test();
    expect(true === true).toEqual(true);
  });
  it("should return false", () => {
    expect(false === false).toEqual(false);
  });
});

describe("divide test", () => {
  it("quotient should be 2", () => {
    expect(divide(10, 5)).toEqual(2);
  });
});

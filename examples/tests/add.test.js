const { add } = require("../src/add");
const { divide } = require("../src/divide");

describe("add function", () => {
  afterAll(function () {
    console.log("afterAll");
  });
  beforeEach(function () {
    console.log("beforeEach");
    const myObj = { name: "testing", age: 1 };
  });
  afterEach(function () {
    console.log("afterEach");
  });
  it("should return 2 when given (1,1)", () => {
    expect(add(1, 1)).toEqual(3);
  });
  it("should return 4 when given(1,3)", () => {
    expect(add(1, 3)).toBe(5);
  });
});

describe.only("only test", () => {
  beforeEach(function () {
    const myObj = { name: "mike", age: 7 };
    return myObj;
  });
  it("should return true", () => {
    expect(true === true).toEqual(true);
  });
  it("should return false", () => {
    expect(false === false).toEqual(false);
  });
});

describe.only("divide test", () => {
  it("quotient should be 2", () => {
    expect(divide(10, 5)).toEqual(2);
  });
});

const { add } = require("../src/add");
const { divide } = require("../src/divide");

describe("test Falsy function", () => {
  it("should return false", () => {
    expect(1 === 2).toBeFalsy();
  });
  it("should return false also", () => {
    expect(1 === 1).toBeTruthy();
  });
});

describe("test Truthy function", () => {
  it("should return true", () => {
    expect(1 === 1).toBeTruthy();
  });
  it("should return true also", () => {
    expect(1 === 2).toBeFalsy();
  });
});

describe("add function", () => {
  it("should return 2 when given (1,1)", () => {
    expect(add(1, 1)).toEqual(2);
  });
  it("should return 4 when given(1,3)", () => {
    expect(add(1, 3)).toBe(4);
  });
});

describe("only test", () => {
  it("should return true", () => {
    expect(true === true).toEqual(true);
  });
  it("should return false", () => {
    expect(false === false).toEqual(true);
  });
});

describe("divide test", () => {
  it("quotient should be 2", () => {
    expect(divide(10, 5)).toEqual(2);
  });
});

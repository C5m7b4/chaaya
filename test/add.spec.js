const add = require("../src/add");
const { isValid } = require("../src/utils");

describe("Add Numbers", () => {
  it("should add 1 + 1", () => {
    expect(add(1, 1)).toEqual(2);
  });
});

describe.only("isValid", () => {
  it("should return false string when given undefined", () => {
    expect(isValid(undefined)).toBe(true);
  });
});

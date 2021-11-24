const { add } = require("../src/add");

describe("add", () => {
  it("should return 2", () => {
    expect(add(1, 1)).toEqual(2);
  });
  it("should return 3", () => {
    expect(add(1, 3)).toBe(5);
  });
});

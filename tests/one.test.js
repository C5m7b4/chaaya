const { add } = require("../examples/src/add");

describe("add", () => {
  it("should equal 2", () => {
    expect(add(1, 1)).toEqual(4);
  });
  it("should equal 3", () => {
    expect(add(1, 2)).toEqual(5);
  });
  it("should be 3", () => {
    expect(add(1, 2)).toBe(3);
  });
});

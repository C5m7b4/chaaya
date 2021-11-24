const { add } = require("../src/add");

describe("add", () => {
  it("should return 2", () => {
    expect(add(1, 1)).toEqual(2);
  });
});

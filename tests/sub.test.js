const { sub } = require("../examples/src/sub");

describe("Sub", () => {
  it("should return 1", () => {
    expect(sub(3, 2)).toEqual(1);
  });
});

const { sub } = require("../src/sub");

describe("Sub Function", () => {
  it("should return 1 when given (3,2)", () => {
    expect(sub(3, 2)).toEqual(1);
  });
});

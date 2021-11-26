const { sub } = require("../src/sub");

describe("Sub Function", () => {
  it("should return 1 when given (3,2)", () => {
    expect(sub(3, 2)).toEqual(1);
  });
  it("should return 3 when given (9,6)", () => {
    expect(sub(9, 6)).toEqual(4);
  });
});

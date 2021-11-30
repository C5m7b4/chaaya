const sub = require("../src/sub");

describe("Subtracting numbers", () => {
  it("should subtract 1 from 2", () => {
    expect(sub(2, 1)).toEqual(1);
  });
  it("should subtract 2 from 3", () => {
    expect(sub(3, 2)).toEqual(1);
  });
});

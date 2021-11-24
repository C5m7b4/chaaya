const { add } = require("../examples/src/add");

describe("add", () => {
  it("shoudl add ttwo numbers", () => {
    expect(add(1, 1)).toEqual(2);
  });
});

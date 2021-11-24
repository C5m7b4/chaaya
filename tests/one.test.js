const { add } = require("../examples/src/add");

it("shoudl add ttwo numbers", () => {
  expect(add(1, 1)).toEqual(2);
});

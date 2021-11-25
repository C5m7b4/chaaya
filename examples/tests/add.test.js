const { add } = require("../src/add");

describe.skip("add function", () => {
  beforeAll(function () {
    console.log("beforeAll");
  });
  afterAll(function () {
    console.log("afterAll");
  });
  beforeEach(function () {
    console.log("beforeEach");
  });
  afterEach(function () {
    console.log("afterEach");
  });
  it("should return 2 when given (1,1)", () => {
    expect(add(1, 1)).toEqual(3);
  });
  it("should return 4 when given(1,3)", () => {
    expect(add(1, 3)).toBe(5);
  });
});

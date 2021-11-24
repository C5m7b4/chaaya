const chalk = require("chalk");

const log = console.log;

let beforeEachs = [];
let afterEachs = [];
let afterAlls = [];
let beforeAlls = [];

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

let stats = [];

let currDesc = {
  it: [],
};

let currIt = {};

function beforeEach(fn) {
  beforeEachs.push(fn);
}

function afterEach(fn) {
  afterEachs.push(fn);
}

function beforeAll(fn) {
  beforeAlls.push(fn);
}

function afterAll(fn) {
  afterAlls.push(fn);
}

function expect(value) {
  return {
    toBe: function (expected) {
      if (value === expected) {
        currIt.expects.push({
          name: `expect ${value} toBe ${expected}`,
          status: true,
        });
        passedTests++;
      } else {
        currIt.expects.push({
          name: `expects ${value} toBe ${expected}`,
          status: false,
        });
        failedTests++;
      }
    },
    toEqual: function (expected) {
      if (value === expected) {
        currIt.expects.push({
          name: `expects ${value} toEqual ${expected}`,
          status: true,
        });
        passedTests++;
      } else {
        currIt.expects.push({
          name: `expects ${value} toEqual ${expected}`,
          status: false,
        });
        failedTests++;
      }
    },
  };
}

function it(desc, fn) {
  totalTests++;

  currIt = {
    name: desc,
    expects: [],
  };

  fn.apply(this);

  currDesc.it.push(currIt);
}

exports.showTestResults = function showTestResults() {
  log(chalk.green.bold(`Total Tests: ${totalTests}`));
};

// global.describe = describe;
global.it = it;
global.expect = expect;
global.afterEach = afterEach;
global.beforeEach = beforeEach;
global.beforeAll = beforeAll;
global.afterAll = afterAll;

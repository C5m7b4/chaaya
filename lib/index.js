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
  if (beforeEachs) {
    for (var index = 0; index < beforeEachs.length; index++) {
      beforeEachs[index].apply(this);
    }
  }

  currIt = {
    name: desc,
    expects: [],
  };

  fn.apply(this);
  for (var index = 0; index < afterEachs.length; index++) {
    afterEachs[index].apply(this);
  }

  currDesc.it.push(currIt);
}

function describe(desc, fn) {
  currDesc = {
    it: [],
  };

  for (var index = 0; index < beforeAlls.length; index++) {
    beforeAlls[index].apply(this);
  }

  currDesc.name = desc;
  fn.apply(this);

  for (var index = 0; index < afterAlls.length; index++) {
    afterAlls[index].apply(this);
  }

  stats.push(currDesc);
}

exports.showTestResults = function showTestResults() {
  log(chalk.green.bold(`Total Tests: ${totalTests}`));

  for (var index = 0; index < stats.length; index++) {
    var e = stats[index];
    const descName = e.name;
    const its = e.it;
    log(descName);
    for (var i = 0; i < its.length; i++) {
      var _e = its[i];
      log(`  ${_e.name}`);
      for (var ii = 0; ii < _e.expects.length; ii++) {
        const expect = _e.expects[ii];
        log(
          `   ${expect.status === true ? chalk.green("✔") : chalk.red("x")} ${
            expect.name
          }`
        );
      }
    }
  }
};

global.describe = describe;
global.it = it;
global.expect = expect;
global.afterEach = afterEach;
global.beforeEach = beforeEach;
global.beforeAll = beforeAll;
global.afterAll = afterAll;

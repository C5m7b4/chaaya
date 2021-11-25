const chalk = require("chalk");

const {
  success,
  failure,
  successBold,
  failureBold,
  resetColors,
  info,
  describeName,
  testOutput,
  skippedDescribe,
} = require("../lib/indicators");

const log = console.log;

let beforeEachs = [];
let afterEachs = [];
let afterAlls = [];
let beforeAlls = [];

let totalDescribes = 0;
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let totalDescribesSkipped = 0;
let totalItsSkipped = 0;

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
          name: currIt.name,
          status: true,
        });
        passedTests++;
      } else {
        currIt.expects.push({
          name: currIt.name,
          reason: `expected ${expected} but evaluated as ${value}`,
          status: false,
        });
        failedTests++;
      }
    },
    toEqual: function (expected) {
      if (value === expected) {
        currIt.expects.push({
          name: currIt.name,
          status: true,
        });
        passedTests++;
      } else {
        currIt.expects.push({
          name: currIt.name,
          reason: `expected ${expected} but evaluated to ${value}`,
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
  totalDescribes++;
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

describe.skip = function (desc, fn) {
  totalDescribes++;
  totalDescribesSkipped++;
  skippedDescribe(desc);
};

exports.showTestResults = function showTestResults() {
  resetColors();
  //   log("\n");
  failedTests > 0 ? failureBold("Test Suite") : successBold("Test Suite");

  for (var index = 0; index < stats.length; index++) {
    var e = stats[index];
    const descName = e.name;
    const its = e.it;
    describeName(descName);
    for (var i = 0; i < its.length; i++) {
      var _e = its[i];
      for (var ii = 0; ii < _e.expects.length; ii++) {
        const expect = _e.expects[ii];
        expect.status === true
          ? success("✔   " + expect.name)
          : failure("X   " + expect.name);

        if (expect.status !== true) {
          failure("\t" + expect.reason);
        }
      }
    }
  }

  success("----------------------------------");
  log("Total Test Suites: " + totalDescribes);
  log(`Total Tests: ${totalTests}`);
  log(`Total Describes skipped: ${totalDescribesSkipped}`);
  testOutput(passedTests, failedTests);
};

global.describe = describe;
global.it = it;
global.expect = expect;
global.afterEach = afterEach;
global.beforeEach = beforeEach;
global.beforeAll = beforeAll;
global.afterAll = afterAll;

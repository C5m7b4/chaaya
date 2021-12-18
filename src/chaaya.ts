import {
  CurrDesProps,
  CurrIt,
  iDescribe,
  iIt,
  iBeforeEach,
  iAfterEach,
  iAfterAll,
  iBeforeAll,
  iSetDryRun,
} from './interfaces';
import { skippedDescribe } from './indicators';
import { resetPassedTests, resetFailedTests } from './expect';
const log = console.log;

let beforeEachs = Array();
let afterEachs = Array();
let afterAlls = Array();
let beforeAlls = Array();

export let totalDescribes = 0;
export let totalTests = 0;

export let totalDescribesSkipped = 0;
let totalItsSkipped = 0;

let dryRun = false;
let onlyFunction: any;

export let stats = ([] = []);

let currDesc: CurrDesProps = {
  it: [],
  warnings: [],
  skippedOnlies: [],
  beforeAll: [],
  skippedIts: [],
};

let currIt: CurrIt = {};

let beforeEach: iBeforeEach;
beforeEach = function (fn) {
  beforeEachs.push(fn);
};

let afterEach: iAfterEach;
afterEach = function (fn) {
  afterEachs.push(fn);
};

let beforeAll: iBeforeAll;
beforeAll = function (fn) {
  beforeAlls.push(fn);
  currDesc.beforeAll = fn;
};

let afterAll: iAfterAll;
afterAll = function (fn) {
  afterAlls.push(fn);
};

let setDryRun: iSetDryRun;
setDryRun = function (value) {
  dryRun = value;
};

function resetStats() {
  totalDescribes = 0;
  totalTests = 0;
  resetPassedTests(), resetFailedTests(), (stats = []);
}

let it: iIt;
it = function (this, desc, fn) {
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
};

it.skip = function (desc: string, fn: any) {
  totalItsSkipped++;
  totalTests++;
  currDesc.skippedIts.push(desc);
  skippedDescribe(desc);
};

let describe: iDescribe;

describe = function (this, desc, fn) {
  if (dryRun) {
    return;
  } else {
    if (onlyFunction) {
      if (onlyFunction !== desc) {
        return;
      }
    }
  }

  totalDescribes++;
  currDesc = {
    it: [],
    warnings: [],
    skippedOnlies: [],
    beforeAll: [],
    skippedIts: [],
  };

  for (var index = 0; index < beforeAlls.length; index++) {
    beforeAlls[index].apply(this);
  }

  currDesc.name = desc;
  fn.apply(this);

  for (var index = 0; index < afterAlls.length; index++) {
    afterAlls[index].apply(this);
  }

  //stats.push(currDesc);
};

describe.skip = function (desc: string, fn: any) {
  totalDescribes++;
  totalDescribesSkipped++;
  skippedDescribe(desc);
};

describe.only = function (desc: string, fn: any) {
  if (onlyFunction) {
    // we can only have one only function so we need a way to alert the user here
    if (onlyFunction !== desc) {
      currDesc.warnings.push(
        `\tThere can only be one 'Once'. Found '${onlyFunction}' when running the '${desc}' describe function`
      );
      currDesc.skippedOnlies.push(desc);
    }
    if (!dryRun) {
      describe(desc, fn);
    }
  } else {
    onlyFunction = desc;
    console.log(`\tset only to '${desc}'`);
    describe(desc, fn);
  }
};

export { currIt };

global.describe = describe;
global.it = it;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.beforeAll = beforeAll;
global.afterAll = afterAll;
global.setDryRun = setDryRun;
global.resetStats = resetStats;

export { describe };

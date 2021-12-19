/* eslint-disable @typescript-eslint/no-explicit-any */
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

const globalAny: any = global;

const beforeEachs: any[] = [];
const afterEachs: any[] = [];
const afterAlls: any[] = [];
const beforeAlls: any[] = [];

export let totalDescribes = 0;
export let totalTests = 0;

export let totalDescribesSkipped = 0;

let dryRun = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const beforeEach: iBeforeEach = function (fn) {
  beforeEachs.push(fn);
};

const afterEach: iAfterEach = function (fn) {
  afterEachs.push(fn);
};

const beforeAll: iBeforeAll = function (fn) {
  beforeAlls.push(fn);
  currDesc.beforeAll = fn;
};

const afterAll: iAfterAll = function (fn) {
  afterAlls.push(fn);
};

const setDryRun: iSetDryRun = function (value) {
  dryRun = value;
};

function resetStats() {
  totalDescribes = 0;
  totalTests = 0;
  resetPassedTests(), resetFailedTests(), (stats = []);
}

const it: iIt = function (this, desc, fn) {
  totalTests++;
  if (beforeEachs) {
    for (let index = 0; index < beforeEachs.length; index++) {
      beforeEachs[index].apply(this);
    }
  }

  currIt = {
    name: desc,
    expects: [],
  };

  fn.apply(this);
  for (let index = 0; index < afterEachs.length; index++) {
    afterEachs[index].apply(this);
  }

  currDesc.it.push(currIt);
};

it.skip = function (desc: string, fn: any) {
  totalTests++;
  currDesc.skippedIts.push(desc);
  skippedDescribe(desc);
};

const describe: iDescribe = function (this, desc, fn) {
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

  for (let index = 0; index < beforeAlls.length; index++) {
    beforeAlls[index].apply(this);
  }

  currDesc.name = desc;
  fn.apply(this);

  for (let index = 0; index < afterAlls.length; index++) {
    afterAlls[index].apply(this);
  }

  //stats.push(currDesc);
};

describe.skip = function (desc: string) {
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

globalAny.describe = describe;
globalAny.it = it;
globalAny.beforeEach = beforeEach;
globalAny.afterEach = afterEach;
globalAny.beforeAll = beforeAll;
globalAny.afterAll = afterAll;
globalAny.setDryRun = setDryRun;
globalAny.resetStats = resetStats;

export { describe };

import {
  iDescribe,
  iIt,
  iExpect,
  iBeforeEach,
  iAfterEach,
  iBeforeAll,
  iAfterAll,
  iSetDryRun,
} from './interfaces';
declare global {
  var describe: iDescribe;
  var it: iIt;
  var expect: iExpect;
  var beforeEach: iBeforeEach;
  var afterEach: iAfterEach;
  var beforeAll: iBeforeAll;
  var afterAll: iAfterAll;
  var setDryRun: iSetDryRun;
  var resetStats: () => void;
}

export {};

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
  let describe: iDescribe;
  let it: iIt;
  let expect: iExpect;
  let beforeEach: iBeforeEach;
  let afterEach: iAfterEach;
  let beforeAll: iBeforeAll;
  let afterAll: iAfterAll;
  let setDryRun: iSetDryRun;
  let resetStats: () => void;
}

export {};

import {
  resetColors,
  failureBold,
  successBold,
  describeName,
  success,
  failure,
  testOutput,
  skippedOnly,
} from './indicators';
import { failedTests, passedTests } from './expect';
import { CurrentStat } from './interfaces';
import {
  stats,
  totalDescribes,
  totalTests,
  totalDescribesSkipped,
} from './chaaya';

const log = console.log;

const showTestResults = () => {
  resetColors();
  //   log("\n");
  failedTests > 0 ? failureBold('Test Suite') : successBold('Test Suite');

  for (let index = 0; index < stats.length; index++) {
    const e: CurrentStat = stats[index];
    const descName = e.name;
    const its = e.it;
    describeName(descName);
    if (e.skippedIts.length > 0) {
      log(`\tskipped ${e.skippedIts.length} its`);
    }
    if (e.warnings.length > 0) {
      for (let w = 0; w < e.warnings.length; w++) {
        log(e.warnings[w]);
      }
      for (let so = 0; so < e.skippedOnlies.length; so++) {
        skippedOnly(e.skippedOnlies[so]);
      }
    }
    for (let i = 0; i < its.length; i++) {
      const _e = its[i];
      for (let ii = 0; ii < _e.expects.length; ii++) {
        const expect = _e.expects[ii];
        expect.status === true
          ? success('✔   ' + expect.name)
          : failure('X   ' + expect.name);

        if (expect.status !== true) {
          failure('\t' + expect.reason);
        }
      }
    }
  }

  success('----------------------------------');
  log('Total Test Suites: ' + totalDescribes);
  log(`Total Tests: ${totalTests}`);
  log(`Total Describes skipped: ${totalDescribesSkipped}`);
  testOutput(passedTests, failedTests);
};

export { showTestResults };

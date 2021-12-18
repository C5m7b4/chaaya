import { iExpect } from './interfaces';
import { currIt } from './chaaya';

let passedTests: number = 0;
let failedTests: number = 0;

let expect: iExpect;

expect = function (value: any) {
  return {
    toBe: function (expected: any) {
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
    toEqual: function (expected: any) {
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
    toBeTruthy: function () {
      if (value === true) {
        currIt.expects.push({
          name: currIt.name,
          status: true,
        });
      } else {
        currIt.expects.push({
          name: currIt.name,
          status: false,
          reason: `${value} is not truthy`,
        });
      }
    },
    toBeFalsy: function () {
      if (!value) {
        currIt.expects.push({
          name: currIt.name,
          status: true,
        });
      } else {
        currIt.expects.push({
          name: currIt.name,
          status: false,
          reason: `${value} is not false`,
        });
      }
    },
  };
};

const resetPassedTests = () => {
  passedTests = 0;
};

const resetFailedTests = () => {
  failedTests = 0;
};

export { expect, passedTests, resetPassedTests, failedTests, resetFailedTests };

global.expect = expect;

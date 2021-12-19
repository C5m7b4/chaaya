import { iExpect } from './interfaces';
import { currIt } from './chaaya';
const globalAny: any = global;

let passedTests = 0;
let failedTests = 0;

const expect: iExpect = function (value: any) {
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

globalAny.expect = expect;

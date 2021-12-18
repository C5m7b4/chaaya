import { colors } from './colors';

const log = console.log;

const success = (output: string) => {
  log(colors.fg.green, output, colors.base.reset);
};

const failure = (output: string) => {
  log(colors.fg.red, output, colors.base.reset);
};

const info = (output: string) => {
  log(colors.fg.yellow, output, colors.base.reset);
};

const successBold = (output: string) => {
  log(colors.bg.green, colors.fg.white, output, colors.base.reset);
};

const failureBold = (output: string) => {
  log(colors.bg.red, colors.fg.white, output, colors.base.reset);
};

const blink = (output: string) => {
  log(colors.fg.crimson, colors.base.blink, output);
};

const resetColors = () => {
  log(colors.base.reset);
};

const describeName = (name: string) => {
  log(colors.base.bright, colors.fg.blue, name, colors.base.reset);
};

const testOutput = (passed: number, failed: number) => {
  log(
    `Tests: \x1b[32m${passed} passed, \x1b[31m${failed} failed`,
    colors.base.reset
  );
};

const skippedDescribe = (name: string) => {
  log(colors.fg.magenta, `\tSkipping ${name}`);
};

const skippedOnly = (name: string) => {
  log(`\t\x1b[36mSkipped Only: \x1b[31m${name}, ${colors.base.reset}`);
};

export {
  success,
  failure,
  info,
  successBold,
  failureBold,
  blink,
  resetColors,
  describeName,
  testOutput,
  skippedDescribe,
  skippedOnly,
};

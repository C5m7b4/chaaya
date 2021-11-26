const colorIds = require("./colors");
const colors = colorIds.colors;

const log = console.log;

const success = (output) => {
  log(colors.fg.green, output, colors.reset);
};

const failure = (output) => {
  log(colors.fg.red, output, colors.reset);
};

const info = (output) => {
  log(colors.fg.yellow, output, colors.reset);
};

const successBold = (output) => {
  log(colors.bg.green, colors.fg.white, output, colors.reset);
};

const failureBold = (output) => {
  log(colors.bg.red, colors.fg.white, output, colors.reset);
};

const blink = (output) => {
  log(colors.fg.crimson, colors.blink, output);
};

const resetColors = () => {
  log(colors.reset);
};

const describeName = (name) => {
  log(colors.bright, colors.fg.blue, name, colors.reset);
};

const testOutput = (passed, failed) => {
  log(
    `Tests: \x1b[32m${passed} passed, \x1b[31m${failed} failed`,
    colors.reset
  );
};

const skippedDescribe = (name) => {
  log(colors.fg.magenta, `\tSkipping ${name}`);
};

const skippedOnly = (name) => {
  log(`\t\x1b[36mSkipped Only: \x1b[31m${name}, ${colors.reset}`);
};

module.exports = {
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

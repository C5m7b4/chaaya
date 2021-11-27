const path = require("path");
const fs = require("fs");
const { showTestResults } = require("./../");
const { success, failure } = require("../indicators");
const { findTestfiles } = require("../../util");

const log = console.log;

function runTestFiles(f = []) {
  console.log("running test files");
  setDryRun(true);
  f.forEach((g) => {
    require(fs.realpathSync(g));
    delete require.cache[require.resolve(g)];
  });

  // now we should know if we have any only files
  setDryRun(false);
  f.forEach((g) => {
    require(fs.realpathSync(g));
  });
  showTestResults();
}

function run() {
  success("Testing...");
  let fileList = findTestfiles();
  if (fileList.length > 0) {
    runTestFiles(fileList);
  } else {
    failure("No Tests found");
  }
}

// run();

exports.main = (argv = process.argv.slice(2), mochaArgs) => {
  console.log(argv);
  run();
};

if (require.main === module) {
  exports.main();
}

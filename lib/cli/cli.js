const path = require("path");
const fs = require("fs");
const { showTestResults } = require("./../");
const { success, failure } = require("../indicators");
const { findTestfiles } = require("../../util");

const log = console.log;

// const fileExtensions = ["test.js", "spec.js"];

// function getExtension(filename) {
//   var i = filename.indexOf(".");
//   return filename.substr(i + 1);
// }

// function searchTestFolder() {
//   if (!fs.existsSync("tests/")) {
//     return false;
//   } else {
//     return true;
//   }
// }

// function getTestFiles() {
//   let f = null;
//   if ((f = fs.readdirSync("tests/"))) {
//     return f.length == 0 ? null : f;
//   }
// }

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
  run();
};

if (require.main === module) {
  exports.main();
}

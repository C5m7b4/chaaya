const path = require("path");
const fs = require("fs");
const { showTestResults } = require("./../");
const { success, failure } = require("../indicators");
const { findTestfiles } = require("../../util");

const log = console.log;

function searchTestFolder() {
  if (!fs.existsSync("tests/")) {
    return false;
  } else {
    return true;
  }
}

function getTestFiles() {
  let f = null;
  if ((f = fs.readdirSync("tests/"))) {
    return f.length == 0 ? null : f;
  }
}

function runTestFiles(f = []) {
  f.forEach((g) => {
    require(fs.realpathSync(`tests/${g}`));
  });
  showTestResults();
}

async function run() {
  success("Testing...");
  let fileList = await findTestfiles();
  console.log(fileList);
  if (fileList.length > 0) {
    runTestFiles(fileList);
  } else {
    failure("No Tests found");
  }

  //   if (searchTestFolder()) {
  //     let files;
  //     if ((files = getTestFiles())) {
  //       runTestFiles(files);
  //     } else {
  //       failure("No test files were found");
  //     }
  //   } else {
  //     failure(`'test' folder does not exist`);
  //   }
}

run();

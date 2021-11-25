const path = require("path");
const fs = require("fs");
const { showTestResults } = require("./../");
const { success, failure } = require("../indicators");
const { findTestfiles } = require("../../util");

const log = console.log;

const fileExtensions = ["test.js", "spec.js"];

function getExtension(filename) {
  var i = filename.indexOf(".");
  return filename.substr(i + 1);
}

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

run();

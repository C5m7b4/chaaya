const path = require("path");
const fs = require("fs");
const { showTestResults } = require("./../");
const chalk = require("chalk");

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

function run() {
  log(chalk.green("testing..."));
  if (searchTestFolder()) {
    let files;
    if ((files = getTestFiles())) {
      runTestFiles(files);
    } else {
      log(chalk.red("No test files were found"));
    }
  } else {
    log(chalk.red(`'test' folder does not exist`));
  }
}

run();

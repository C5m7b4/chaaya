const path = require("path");
const fs = require("fs");
const { showTestResults } = require("./../");
const { success, failure } = require("../indicators");
const Watcher = require("symmetra");
const {
  fileExtensions,
  excludeFiles,
  interval,
  baseUrl,
} = require("../../util");
const arg = require("arg");

const log = console.log;

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--watch": Boolean,
      "-w": "--watch",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    watch: args["--watch"] || false,
  };
}

function runSingleTestFile(filename) {
  resetStats();
  console.log("Running single file: " + filename);
  delete require.cache[require.resolve(filename)];
  setDryRun(true);
  require(filename);
  delete require.cache[require.resolve(filename)];
  setDryRun(false);
  require(filename);
  showTestResults();
}

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

function run(options) {
  success("Testing...");
  let doWatch = false;
  if (options.watch) doWatch = true;
  const watcher = new Watcher(
    baseUrl,
    fileExtensions,
    excludeFiles,
    interval,
    acceptFileList,
    detectChange,
    doWatch
  );
  watcher.start();
  if (doWatch) {
    success("\tWatching files...");
  }
}

function acceptFileList(files) {
  if (files.length > 0) {
    runTestFiles(files);
  } else {
    console.log("no test files detected");
  }
}

function detectChange(file, curr, prev) {
  console.log("change detected");
  console.log(file);
  console.log(curr);
  console.log(prev);
  runSingleTestFile(file);
}

exports.main = (args) => {
  let options = parseArgumentsIntoOptions(args);
  console.log(options);
  run(options);
};

const path = require("path");
const fs = require("fs");
const { showTestResults } = require("./../");
const { success, failure } = require("../indicators");
const { findTestfiles, watchFiles } = require("../../util");
const arg = require("arg");

const log = console.log;
let fileList = [];
let stopWatching = false;

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
  console.log("Running single file: " + filename);
  delete require.cache[require.resolve(filename)];
  setDryRun(true);
  require(filename);
  delete require.cache[require.resolve(filename)];
  setDryRun(false);
  require(filename);
}

function doesTestFileExist(filename) {
  for (var i = 0; i < fileList.length; i++) {
    var nameInList = fileList[i];
    if (filename === nameInList) {
      return true;
    }
  }
  return false;
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

function run() {
  success("Testing...");
  fileList = findTestfiles();
  if (fileList.length > 0) {
    runTestFiles(fileList);
  } else {
    failure("No Tests found");
  }
}

function fileHasChanged(options, baseUrl, event, trigger) {
  // for now we are only going to remove the file that changed from the cache
  // this should speed things up for the version 1 watch attempt
  const fileToDeleteFromCache = path.join(baseUrl, trigger);
  console.log("event: " + event + ", trigger:" + fileToDeleteFromCache);
  if (!stopWatching) {
    if (doesTestFileExist(fileToDeleteFromCache)) {
      stopWatching = true;
      runSingleTestFile(fileToDeleteFromCache);
      showTestResults();
      stopWatching = false;
      echoWatching(options);
    } else {
      console.log("file is not a testing file");
    }
  }
}

function echoWatching(options) {
  if (options.watch) {
    console.log("\nwatching for changes...");
    watchFiles(options, fileHasChanged);
  }
}

// run();

exports.main = (args) => {
  let options = parseArgumentsIntoOptions(args);
  console.log(options);
  stopWatching = true;
  run();
  stopWatching = false;
  echoWatching(options);
};

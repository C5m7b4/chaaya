import { showTestResults } from './results';
const fs = require('fs');

function runTestFiles(f: string[]) {
  console.log('running test files');

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

function runSingleTestFile(filename: string) {
  resetStats();
  console.log('Running single file: ' + filename);
  delete require.cache[require.resolve(filename)];
  setDryRun(true);
  require(filename);
  delete require.cache[require.resolve(filename)];
  setDryRun(false);
  require(filename);
  showTestResults();
}

export { runTestFiles, runSingleTestFile };

import { runTestFiles, runSingleTestFile } from './runners';

function acceptFileList(files: string[]) {
  if (files.length > 0) {
    runTestFiles(files);
  } else {
    console.log('no test files detected');
  }
}

function detectChange(file: string, curr: Date, prev: Date) {
  console.log('change detected');
  console.log(file);
  console.log(curr);
  console.log(prev);
  runSingleTestFile(file);
}

export { acceptFileList, detectChange };

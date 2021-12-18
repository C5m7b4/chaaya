import parseArgumentsIntoOptions from './args';
import { Options } from './interfaces';
import { success, failure } from './indicators';
import { acceptFileList, detectChange } from './files';

const path = require('path');
const fs = require('fs');
// const { showTestResults } = require('./../');

const Watcher = require('symmetra');

const { fileExtensions, excludeFiles, interval, baseUrl } = require('../util');

const log = console.log;

function run(options: Options) {
  success('Testing...');
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
    success('\tWatching files...');
  }
}

exports.main = (argv: string[]) => {
  const message: string = 'Hello';
  console.log(message);
  let options = parseArgumentsIntoOptions(argv);
  console.log(options);
  // run(options);
};

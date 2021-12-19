const { Watcher } = require('symmetra');
import parseArgumentsIntoOptions from './args';
import { Options } from './interfaces';
import { success } from './indicators';
import { acceptFileList, detectChange } from './files';

const { fileExtensions, excludeFiles, interval, baseUrl } = require('../util');

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
  const options = parseArgumentsIntoOptions(argv);
  console.log(options);
  run(options);
};

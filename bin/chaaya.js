#!/usr/bin/env node
process.title = 'chaaya';
process.argv.push('--watch');
require('../dist/index.js').main(process.argv);

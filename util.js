const config = require('./chaaya.config');

const excludeFiles = config['excludeFiles'];
const fileExtensions = config['extensions'];
const interval = config['interval'];
const baseUrl = __dirname;

module.exports = { excludeFiles, fileExtensions, interval, baseUrl };

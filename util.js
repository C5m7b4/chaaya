const path = require("path");
const { readdirSync, statSync } = require("fs");

const config = require("./chaaya.config");

const excludeFiles = config["excludeFiles"];
const fileExtensions = config["extensions"];

function containsExtension(extension) {
  for (var i = 0; i < fileExtensions.length; i++) {
    if (fileExtensions[i] === extension) {
      return true;
    }
  }
  return false;
}

function findTestfiles(callback) {
  const dir = __dirname;
  const testDirectory = path.join(dir, "tests");
  return getAllFiles(dir, ".js");
}

function testFile(filename) {
  var pos = filename.indexOf(".");
  var test = filename.substr(pos + 1);
  if (containsExtension(test)) {
    return true;
  } else {
    return false;
  }
}

const getAllFiles = (dir, extn, files, result, regex) => {
  files = files || readdirSync(dir);
  result = result || [];

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    if (!excludeFiles.includes(filename)) {
      let file = path.join(dir, filename);
      if (statSync(file).isDirectory()) {
        try {
          result = getAllFiles(file, extn, readdirSync(file), result, regex);
        } catch (error) {
          console.log(error.msg);
          continue;
        }
      } else {
        if (testFile(file)) {
          result.push(file);
        }
      }
    }
  }

  return result;
};

module.exports = { findTestfiles };

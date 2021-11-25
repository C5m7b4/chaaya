const path = require("path");
const { readdirSync, statSync } = require("fs");

const config = require("./chaaya.config.json");

const excludeFiles = [
  ".git",
  "bin",
  "node_modules",
  ".gitignore",
  "package.json",
  "package-lock.json",
];

function findTestfiles(callback) {
  const dir = __dirname;
  const testDirectory = path.join(dir, "tests");
  return getAllFiles(dir, ".js");
}

function testFile(filename) {
  var fileExtensions = config["extensions"];
  var pos = filename.indexOf(".");
  var test = filename.substr(pos + 1);
  if (fileExtensions.includes(test)) {
    return true;
  } else {
    return false;
  }
}

const getAllFiles = (dir, extn, files, result, regex) => {
  files = files || readdirSync(dir);
  result = result || [];

  //regex = regex || new RegExp(`\\${extn}$`);

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

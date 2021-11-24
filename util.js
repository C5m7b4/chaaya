const path = require("path");
const { readdirSync, statSync } = require("fs");

const excludeFiles = [
  ".git",
  "bin",
  "node_modules",
  ".gitignore",
  "package.json",
  "package-lock.json",
];
const fileExtensions = ["test.js", "spec.js"];

function getExtension(filename) {
  var i = filename.indexOf(".");
  return filename.substr(i + 1);
}

function findTestfiles(callback) {
  const dir = __dirname;
  const testDirectory = path.join(dir, "tests");
  return getAllFiles(dir, ".js");
}

const getAllFiles = (dir, extn, files, result, regex) => {
  files = files || readdirSync(dir);
  result = result || [];
  regex = regex || new RegExp(`\\${extn}$`);

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    if (!excludeFiles.includes(filename)) {
      let file = path.join(dir, filename);
      if (statSync(file).isDirectory()) {
        try {
          result = getAllFiles(file, extn, readdirSync(file), result, regex);
        } catch (error) {
          continue;
        }
      } else {
        if (regex.test(file)) {
          result.push(file);
        }
      }
    }
  }

  return result;
};

module.exports = { findTestfiles };

const fs = require("fs").promises;
const path = require("path");

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

async function findTestfiles(callback) {
  const dir = __dirname;
  //const testDirectory = path.join(dir, "tests");
  return await walk(dir);
}

async function walk(dir) {
  let files = await fs.readdir(dir);
  files = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) return walk(filePath);
      else if (stats.isFile()) return filePath;
    })
  );

  return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

// function walk(directory, callback) {
//   fs.readdir(directory, function (err, files) {
//     if (err) {
//       throw new Error(err);
//     }
//     files.forEach(function (name) {
//       if (!excludeFiles.includes(name)) {
//         var filePath = path.join(directory, name);
//         var stat = fs.statSync(filePath);
//         if (stat.isFile()) {
//           var extension = getExtension(filePath);
//           if (fileExtensions.includes(extension)) {
//             testFiles.push(filePath);
//           }
//         } else if (stat.isDirectory()) {
//           walk(filePath, callback);
//         }
//       }
//     });
//   });
// }

module.exports = { findTestfiles };

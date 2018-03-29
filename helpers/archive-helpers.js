var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readFile = function(path, callback) {
  fs.readFile(path, (err, data) => {
    if (err) throw err;
    return callback(data);
  });
}
// archive.readFile(index, (data) => { res.end(data) })
exports.readListOfUrls = function(callback) {
  exports.readFile(exports.paths.list, (data) => {
    let arr = data.toString().split('\n'); // crashes from here
    arr = arr.slice(0, arr.length);
    callback(arr);
  });
};

exports.isUrlInList = function(url, callback) { // boolean? in my async?
  exports.readListOfUrls((data) => {
    callback(data.includes(url));
  }); //asumes data is splittable
};

exports.addUrlToList = function(url, callback) {
  if (!exports.isUrlInList(url,(data) => {return data})){
    exports.readListOfUrls((urls) => {
      urls.push(url);
      // console.log(urls)
      let urlsList = urls.join('/n');
      // console.log(urlsList)
      callback(fs.writeFile(exports.paths.list, urlsList));
    })  
  }
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};

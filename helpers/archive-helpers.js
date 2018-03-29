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

exports.readListOfUrls = function(callback) {
  callback(paths.list);
};

exports.isUrlInList = function(url, callback) { // returns boolean? for asynch?!
  readListOfUrls((data) => {
    callback(data);
    return data.split('\n').includes(url); //asumes data is splittable
  });
};

exports.addUrlToList = function(url, callback) {
  // !isUrlInList(url…)
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};

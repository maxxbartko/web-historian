var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require("./http-helpers");
// require more modules/folders here!
var index = archive.paths.index;
let result = archive.paths.list;
// let headers 

exports.handleRequest = function (req, res) {
  if (req.method === "GET"){
    console.log('GET');
    // httpHelpers.serveAssets(res, index);
    archive.readListOfUrls((data) => {console.log(data)});
    archive.readFile(index, (data) => {res.end(data)});
  } else if (req.method === 'POST') {
    // console.lol
  }
};

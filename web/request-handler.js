var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require("./http-helpers");
// require more modules/folders here!
let index = archive.paths.index;
let loading = archive.paths.loading;

exports.handleRequest = function (req, res) {
  if (req.method === "GET"){
    let url = req.url.slice(1);
    console.log(url);
    if (url){
      archive.isUrlArchived(url, (data) => {
        console.log(data);
        if (data) {
          console.log("200")
          longUrl = archive.paths.archivedSites+'/'+url;
          console.log(longUrl) 
          httpHelpers.serveAssets(res, longUrl, (data) => { return data; });
        } else {
         // if not
         console.log("404 should happen")
          
          httpHelpers.serveAssets(res, url, (data) => { return data; }, 404);
        }
      });
    } else {
        httpHelpers.serveAssets(res, index, (data) => { return data; });
    }
    
    // archive.readListOfUrls((data) => {console.log(data)});
    // archive.readFile(index, (data) => {res.end(data)});
  } else if (req.method === 'POST') {
    // check if already exists
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString().slice(4);
    });
    
    archive.isUrlInList(body, (data) => {
      if (data) {
        httpHelpers.serveAssets(res, body, (data) => { return data; });
      } else {
       // if not
       archive.addUrlToList(body, (data) => { return data });
       httpHelpers.serveAssets(res, loading, (data) => { return data; }, 302);
      }
    });
    // append to sites.txt
  }
};

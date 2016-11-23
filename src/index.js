
console.log("init server");

var express = require('express');
var app = express();
var http = require('http').Server(app);
//public folder
app.use("/", express.static('./public'));
//favicon
var favicon = new Buffer('AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEQAAAAAREAEAAAAAAAAQAQAAARAAABAAAAAREQAAAAAAAREREAAAAAARERERAAAAAREREREQAAABERERERAAAAEREREREAAAAREQAREQAAAAEQAAEQAAAQAAAAAAABABAAAAAAAAEAERAAAAABEQAAAAAAAAAAD//wAAj/EAAL/9AAC+fQAA/D8AAPgfAADwDwAA4AcAAOAHAADgBwAA4YcAAPPPAAC//QAAv/0AAI/xAAD//wAA', 'base64');
app.get("/favicon.ico", function(req, res) {
  console.log("icon?");
  res.statusCode = 200;
  res.setHeader('Content-Length', favicon.length);
  res.setHeader('Content-Type', 'image/x-icon');
  res.setHeader("Cache-Control", "public, max-age=10");                // expiers after a month
  res.setHeader("Expires", new Date(Date.now() + 10).toUTCString());
  res.end(favicon);
 });

// Imports the `Gun` library
const Gun = require('gun');
// Imported for side effects, adds level adapters.
require('gun-level');
// Import the two libraries
const levelup = require('levelup');
const leveldown = require('leveldown');
// Create a new level instance which saves
// to the `data/` folder.
const levelDB = levelup('data', {
    db: leveldown,
});
// create a new gun instance
//https://github.com/amark/gun/issues/139
var gun = new Gun({
    level: levelDB,
	file:false, //disable data.json save file
	init: true,
});

http.on('request', gun.wsp.server);
/*
  Handle incoming gun traffic
  from clients (that's where the
  real-time goodness comes from).
*/
gun.wsp(http);
// start listening for requests on `localhost:8080`
http.listen(8080);
console.log("server address: http://127.0.0.1:8080/gun");

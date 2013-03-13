var _ = require('underscore');
var http = require('http');
var util = require('util');
var static = require('node-static');

// @link http://www.sitepoint.com/serving-static-files-with-node-js/
var file = new(static.Server)('../client', {
  cache: 5,
  headers: { 'X-Powered-By': 'node-static' }
});
var handler = function(req, res) {
  req.addListener('end', function() {
    file.serve(req, res, function(err, result) {
      if (err) {
        console.error('Error serving %s - %s', req.url, err.message);
        res.writeHead(err.status, err.headers);
        res.end();
      } else {
        console.log('%s - %s', req.url, res.message);
      }
    });
  });
};

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

app.listen(3337);


var segments = [
  { segment: 'male' },
  { segment: 'female' }
], len = segments.length;

// var getRandomSegment = function() {
//   return segments[parseInt(Math.random() * len)];
// };

io.sockets.on('connection', function(socket) {
  socket.emit('newSegment', { segment: 'male' });
  socket.on('updateSegment', function(segment) {
    console.log('got new segment', segment);
    io.sockets.emit('newSegment', segment);
  });
});

// io.sockets.on('message', 

// setInterval(function() {
    // io.sockets.emit('newSegment', getRandomSegment());
// }, (Math.random() * 3000) + 2000);
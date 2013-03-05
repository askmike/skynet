var _ = require('underscore');

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(1337);

function handler (req, res) {
  res.writeHead(200);
  res.end('hasta la vista');
}

var segments = [
  { segment: 'male' },
  { segment: 'female' }
], len = segments.length;

var getRandomSegment = function() {
  return segments[parseInt(Math.random() * len)];
};

io.sockets.on('connection', function(socket) {
  socket.emit('newSegment', getRandomSegment());
});

setInterval(function() {
    io.sockets.emit('newSegment', getRandomSegment());
}, (Math.random() * 3000) + 2000);
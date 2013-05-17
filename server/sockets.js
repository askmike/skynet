var io;
// cache
var vines = [];
var segment = { segment: 'male' };

// send a new list of vines to the client
var updateVines = function(v) {
  vines = v;
  io.sockets.emit('newVines', v);
}

// tell the client to play a new segment
var updateSegment = function(s) {
  // console.log('sending new segment: ', s);
  segment = { segment: s }
  io.sockets.emit('newSegment', segment);
}

var init = function(app) {
  io = require('socket.io').listen(app);
  io.set('log level', 1);

  io.sockets.on('connection', function(socket) {
    socket.emit('newVines', vines);
    socket.emit('newSegment', segment);
  });
}

exports.init = init;
exports.updateSegment = updateSegment;
var io;

var init = function(app) {
  io = require('socket.io').listen(app);
  io.set('log level', 1);

  io.sockets.on('connection', function(socket) {
    socket.emit('newSegment', { segment: 'male' });
    socket.on('updateSegment', function(segment) {
      console.log('got new segment', segment);
      io.sockets.emit('newSegment', segment);
    });
  });

}

var updateClient = function(seg) {
  console.log('sending new segment:\t' + seg);
  io.sockets.emit('newSegment', {segment: seg});
  lastSeg = seg;
}

exports.init = init;
exports.update = updateClient;
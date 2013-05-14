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

var updateClient = function(vine) {
  console.log('sending new video in theme :\t', vine.theme, '\tof segment', vine.segment);
  io.sockets.emit('newVine', vine);
}

exports.init = init;
exports.update = updateClient;
var _ = require('underscore');
var moment = require('moment');

var io;
// cache
var vines = [];
var segment = { segment: 'male' };

// send a new list of vines to the client
var updateVines = function(v) {
  vines = v;
  io.sockets.emit('newVines', v);
}

var refresh = function(req, res) {
  res.send('done @', moment().format('DD-MM HH:mm:ss'));
  io.sockets.emit('refresh');
}

// tell the client to play a new segment
var updateSegment = function(s) {
  io.sockets.emit('newSegment', { segment: s });
}

var init = function(app, storeVine) {
  io = require('socket.io').listen(app);
  io.set('log level', 1);

  io.sockets.on('connection', function(socket) {
    socket.emit('newVines', vines);
    socket.emit('newSegment', segment);
    socket.on('playedVine', storeVine);
  });
}

exports.refresh = refresh;
exports.init = init;
exports.updateSegment = updateSegment;
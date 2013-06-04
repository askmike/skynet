var _ = require('underscore');
var static = require('node-static');
var moment = require('moment');

// we currently have two different test setups on two remote 
// locations. To make sure the data doesn't get mixed up we run
// two node servers. If the ddk is not set we assume this is the
// location.
// 
// We use this hacky solution because it is about the only thing we can easily
// change on the computer vision software per location is the servername and
// the port.
if(process.argv.ddk) {
  console.log(moment().format('YYY-MM-DD HH:mm:ss'), 'setting up skynet for DDK location');
  var port = 1340;
} else {
  console.log(moment().format('YYY-MM-DD HH:mm:ss'), 'setting up skynet for SSG location');
  var port = 1341;
}

// @link http://www.sitepoint.com/serving-static-files-with-node-js/
var file = new(static.Server)('../client', {
  cache: 5,
  headers: { 'X-Powered-By': 'SKYNET' }
});

// process the input received from a third party audience measurement 
var InputHandler = require('./input.js');
var inputHandler = new InputHandler;

// deciding algorithm
var Decider = require('./adapt.js');
var decide = new Decider;

// push the results to a webclient to adapt the content
var sockets = require('./sockets.js');

var onSegment = [
  sockets.updateSegment,
  function(seg) {
    console.log('\tsetting segment: ', seg);  
  }
];

_.each(onSegment, function(fn) {
  decide.on('new segment', fn);
});

// store data (mongo)
var mongoose = require('./mongoose.js');

// api
var api = require('./api.js');
var route = api.route;

// store data (redis)
var datastore = require('./datastore.js');
var logUser = datastore.user;

var onViewer = [
  decide.segment,
  logUser,
  
];

_.each(onViewer, function(fn) {
  inputHandler.on('new viewer', fn);
});

var router = function(req, res) {
  // if it's a ping from the audience measuerment bail out right away
  if(req.url.indexOf('/eyeface-logviewer/camera/ping/') !== -1)
    return res.end('I AM ALIVE');

  // if the request is data from the audience measuerment software route to input.js
  if(req.url.indexOf('/eyeface-logviewer/camera/notification/') !== -1) {
    // console.log('routing to input handler');
    inputHandler.process(req, res);
    return;
  }

  if(req.url.indexOf('/api/refresh') !== -1)
    return sockets.refresh(req, res);

  if(req.url.indexOf('/api/') !== -1)
    return route(req, res);

  staticHandler(req, res);
};

// serve a static file
var staticHandler = function(req, res) {
  req.addListener('end', function() {
    file.serve(req, res, function(err, result) {
      if (err) {
        console.error('Error serving %s - %s', req.url, err.message);
        res.writeHead(err.status, err.headers);
        res.end();
      }
    });
  });
}

var app = require('http').createServer(router);

sockets.init(app, mongoose.storeVine);
app.listen(port);
console.log('SKYNET is watching us');
var _ = require('underscore');
var static = require('node-static');

var port = 1340;

var mongo = require('./mongoose.js');

// @link http://www.sitepoint.com/serving-static-files-with-node-js/
var file = new(static.Server)('../client', {
  cache: 5,
  headers: { 'X-Powered-By': 'SKYNET' }
});

// process the input received from a third party audience measurement 
var processInput = require('./input.js').process;
// push the results to a webclient to adapt the content
var sockets = require('./sockets.js');
// store data (redis)
var log = require('./datastore.js');
var logUser = log.user;
// api
var api = require('./api.js');
var route = api.route;

var handler = function(req, res) {

  // if the request is data from the audience measuerment software route to input.js
  if(req.url.indexOf('/eyeface-logviewer/') !== -1) {
    processInput(req, res, logUser);
    processInput(req, res, sockets.update);
    return;
  }
    

  // if it's an api request
  if(req.url.indexOf('/api/') !== -1)
    return route(req, res);


  // res.end('I AM ALIVE');
  staticHandler(req, res);
};

// serve a static file
var staticHandler = function(req, res) {
  console.log('a');
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

var app = require('http').createServer(handler);

sockets.init(app);
app.listen(port);
console.log('SKYNET is watching us');
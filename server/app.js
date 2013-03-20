var _ = require('underscore');
var static = require('node-static');

// @link http://www.sitepoint.com/serving-static-files-with-node-js/
var file = new(static.Server)('../client', {
  cache: 5,
  headers: { 'X-Powered-By': 'SKYNET' }
});

// process the input received from a third party audience measurement 
var processInput = require('./input.js').process;
// push the results to a webclient to adapt the content
var sockets = require('./sockets.js');

var handler = function(req, res) {
  // if the request is data from the audience measuerment software route to input.js
  if(req.url.indexOf('/eyeface-logviewer/') !== -1)
    return processInput(req, res, sockets.update);

  // else it's static content
  req.addListener('end', function() {
    file.serve(req, res, function(err, result) {
      if (err) {
        console.error('Error serving %s - %s', req.url, err.message);
        res.writeHead(err.status, err.headers);
        res.end();
      }
    });
  });
};

var app = require('http').createServer(handler);

sockets.init(app);
app.listen(1340);
console.log('SKYNET is watching us');
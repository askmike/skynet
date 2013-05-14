var _ = require('underscore');
var datastore = require('./datastore.js');

exports.route = function(req, res) {
  
  var method = req.url.split('/')[2];
  if(methods[ method ])
    methods[ method ](req, res);
  else
    res.end('error');
  
}


// async wraper
var makeDone = function(amount, cb) {
  cb = _.after(amount, cb);
  var res = {};
  return function(key) {
    return function(err, result) {
      if(err) {
        // process error
        res[ key ] = false;
      } else
        res[ key ] = result;
      cb(res);
    }
  }
}

var today = datastore.today;
var history = datastore.history;

var getTodayStats = function(req, res) {
  var done = makeDone(5, function(result) {
    res.end(JSON.stringify(result));
  });

  _.each(['people', 'male', 'female', 'ages', 'minutes'], function(m) {
    today[ m ](done( m ));
  });

}

var getHistoryStats = function(req, res) {
  var done = makeDone(4, function(result) {
    res.end(JSON.stringify(result));
  });

  _.each(['people', 'male', 'female', 'ages'], function(m) {
    history[ m ](done( m ));
  });
}

var moment = require('moment');

var lastReading = function(req, res) {
  datastore.lastLog(function(err, results) {
    res.end(JSON.stringify({at: moment(_.max(results) * 1000).fromNow() }));
  });
}

var methods = {
  today: getTodayStats,
  history: getHistoryStats,
  last: lastReading
}
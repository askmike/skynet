var _ = require('underscore');

var storePing = function(req, res, next) {
  var body = '';
  req.on('data', function(chunk) {
    body += chunk.toString();
  });
  req.on('end', function() {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('I AM ALIVE');
    body = body.split('&');
    
    extractGender(body, next);
  });
};

//    extract the gender out of a POST message deliverd by the audience measurement software
// example input:
// 
// actionid=2&camera=837469442789023979&device=0&starttime=1363700126314&endtime=1363700126514&track=1&person=1&gender=-0.543821&age=38&minR=299.813275&maxR=360.624458&meanR=330.218867
//
// gender < -0.1 = male
// gender > 0.1 = female
var lastGender;
var extractGender = function(body, next) {
  var result = {};
  _.each(body, function(part) {
    part = part.split('=');
    result[part[0]] = part[1];
  });

  if(!result.gender)
    return;
  var gender = parseFloat(result.gender);

  if(gender === NaN || gender === 0)
    return;

  if(gender < 0)
    gender = 'male';
  else
    gender = 'female';

  if(gender === lastGender)
    return;



  next && next(gender);
  lastGender = gender;
}

exports.process = storePing;


// generate fake random input for debugging

/*
var segments = [
  { segment: 'male' },
  { segment: 'female' }
], len = segments.length;

var getRandomSegment = function() {
  return segments[parseInt(Math.random() * len)];
};

setInterval(function() {
    // push to websockets
}, (Math.random() * 3000) + 2000);

*/
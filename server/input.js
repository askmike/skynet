var _ = require('underscore');

var process = function(req, res, next) {
  var body = '';
  req.on('data', function(chunk) {
    body += chunk.toString();
  });
  req.on('end', function() {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('I AM ALIVE');
    
    extractGender(body, next, req);
  });
};

//    extract the gender out of a POST message deliverd by the audience measurement software
// example input:
// 
// actionid=2&camera=837469442789023979&device=0&starttime=1363700126314&endtime=1363700126514&track=1&person=1&gender=-0.543821&age=38&minR=299.813275&maxR=360.624458&meanR=330.218867
//
// gender < -0.1 = male
// gender > 0.1 = female
var lastGender, i = 1;
var extractGender = function(body, next, req) {

  console.log('new message', body, req.url);

  body = body.split('&');
  
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

  console.log('detected gender');

  next && next(gender, result.age);
}

exports.process = process;
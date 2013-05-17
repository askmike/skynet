var _ = require('underscore');
var moment = require('moment');

var InputHandler = function() {
  this.knownUsers = {
    ids: [],
    times: []
  };
};
InputHandler.prototype.__proto__ = require('events').EventEmitter.prototype;

InputHandler.prototype.process = function(req, res) {
  console.log('new message');
  var body = '';
  req.on('data', function(chunk) {
    body += chunk.toString();
  });
  req.on('end', _.bind(function() {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('I AM ALIVE');
    
    this.body = body;
    this.req = req;

    this.extractGender();
  }, this));
};

InputHandler.prototype.newUser = function(id) {
  this.cleanUsers();

  var user = _.indexOf(this.knownUsers.ids, id);
  if(user === -1) {
    // new user
    this.knownUsers.ids.push(id);
    this.knownUsers.times.push(moment());
    return true;
  } else {
    // known user
    this.knownUsers.times[ user ] = moment();
    return false;
  }
}

InputHandler.prototype.cleanUsers = function() {
  var treshold = moment().subtract('s', 5);
  _.each(this.knownUsers.times, function(time, i) {
    if(time < treshold) {
      this.knownUsers.times.splice(i, 1);
      this.knownUsers.ids.splice(i, 1);
    }
  }, this);
}

//    extract the gender out of a POST message deliverd by the audience measurement software
// example input:
// 
// actionid=2&camera=837469442789023979&device=0&starttime=1363700126314&endtime=1363700126514&track=1&person=1&gender=-0.543821&age=38&minR=299.813275&maxR=360.624458&meanR=330.218867
//
// gender < -0.1 = male
// gender > 0.1 = female
InputHandler.prototype.extractGender = function() {
  this.body = this.body.split('&');
  
  var result = {};
  _.each(this.body, function(part) {
    part = part.split('=');
    result[part[0]] = part[1];
  });

  if(!this.newUser(result.person))
    return;

  if(!result.gender)
    return;

  var gender = parseFloat(result.gender);

  if(gender === NaN || gender === 0)
    return;

  if(gender < 0)
    gender = 'male';
  else
    gender = 'female';

  // console.log('detected ', gender);
  this.emit('new viewer', gender, result.age);
}

module.exports = InputHandler;




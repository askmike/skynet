var _ = require('underscore');
var moment = require('moment');

var InputHandler = function() {
  // the hotlist stores all viewers and cleans up
  // viewers that have not appeared for 5 seconds.
  this.hotlist = {
    ids: [],
    times: []
  };

  // the coldlist buffers all viewers until they
  // are not visible anymore
  this.coldlist = [];
};
InputHandler.prototype.__proto__ = require('events').EventEmitter.prototype;

InputHandler.prototype.process = function(req, res) {
  var body = '';
  req.on('data', function(chunk) {
    body += chunk.toString();
  });
  req.on('end', _.bind(function() {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('I AM ALIVE');
    
    this.body = body.split('&');
    this.req = req;

    this.result = {};
    _.each(this.body, function(part) {
      part = part.split('=');
      this.result[_.first(part)] = _.last(part);
    }, this);

    // this.updateViewers(); // coldlist
    this.extractGender(); // hotlist
  }, this));
};

//
//        NEW USERS: HOTLIST
//        for adaptive content
//


// is an ID a known? Update / add it on the htlist
InputHandler.prototype.newUser = function(id) {
  this.cleanUsers();

  var user = _.indexOf(this.hotlist.ids, id);
  if(user === -1) { // new user
    this.hotlist.ids.push(id);
    this.hotlist.times.push(moment());
    return true;
  } else { // known user
    this.hotlist.times[ user ] = moment();
    return false;
  }
}

// remove stuff from the hotlist
InputHandler.prototype.cleanUsers = function() {
  var treshold = moment().subtract('seconds', 3);
  _.each(this.hotlist.times, function(time, i) {
    if(time < treshold) {
      this.hotlist.times.splice(i, 1);
      this.hotlist.ids.splice(i, 1);
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
  if(!this.newUser(this.result.person))
    return;

  if(!this.result.gender)
    return;

  var gender = parseFloat(this.result.gender);

  if(gender === NaN || gender === 0)
    return;

  if(gender < 0)
    gender = 'male';
  else
    gender = 'female';

  this.emit('new viewer', gender, this.result.age, this.result.person);
}

//
//        USERS: COLDLIST
//        for data storage
//

InputHandler.prototype.updateViewers = function() {
  console.log('updating viewers in coldlist');
  // do we have this record?
  var list = _.pluck(this.coldlist, 'id');
  var pos = _.indexOf(list, this.result.person);
  
  if(pos !== -1) {
    // update record
    console.log('known in coldlist:', pos);
    this.coldlist[pos].duration = this.result.duration;
  } else { // new record
    this.coldlist.push({
      id: this.result.person,
      start: moment(),
      duration: this.result.duration
    });
  }
}

// remove the viewers from the coldlist and put them 
// into the mongo database.
InputHandler.prototype.processViewers = function() {
  var toRemove = [];
  var treshold = moment().subtract('s', 10);
  _.each(this.coldlist, function(viewer) {
    var lastUpdate = moment(viewer.start).add('ms', viewer.duration);
    if(lastUpdate > treshold)
      return;

    console.log('\tREMOVING FROM COLDLIST:', viewer);
    toRemove.push(viewer.id);
  });


  this.coldlist = _.filter(this.coldlist, function(viewer) {
    return _.indexOf(toRemove, viewer.id) !== -1;
  });
}

module.exports = InputHandler;
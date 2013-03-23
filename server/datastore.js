var redis = require("redis");
var client = redis.createClient();
client.on("error", function (err) {
  console.log("Error " + err);
});

// helpers
var getDay = function() {
  var m = new Date();
  var day = m.getDate() + '';
  if(day.length === 1)
    day = '0' + day;

  var month = m.getMonth() + '';
  if(month.length === 1)
    month = '0' + month;
  
  return day + month + m.getFullYear();
}

var getMinute = function() {
  var d = new Date();
  d.setSeconds(0);
  return Math.floor(d / 1000);
}


//  REDIS NAMESPACE
// 
// skynet:v0.1:alltime:people
// skynet:v0.1:alltime:male
// skynet:v0.1:alltime:female
// 
// skynet:v0.1:day:[DDMMYYY]:people
// skynet:v0.1:day:[DDMMYYY]:male
// skynet:v0.1:day:[DDMMYYY]:female
//
//          key                             score     member
// ZADD skynet:v0.1:day:[DDMMYYY]:people:set 1 [timestamp of minute]
// ZADD skynet:v0.1:day:[DDMMYYY]:male:set 1 [timestamp of minute]
// ZADD skynet:v0.1:day:[DDMMYYY]:female:set 1 [timestamp of minute]

// ZADD skynet:v0.1:day:[DDMMYYY]:people:age:set 1 [age]
// ZADD skynet:v0.1:day:[DDMMYYY]:male:age:set 1 [age]
// ZADD skynet:v0.1:day:[DDMMYYY]:female:age:set 1 [age]
// 
// This boils down to:
// the amount of people (total + gender specific) that walked by in total
// the amount of people that walked by per day
// the amount of people that walked by per minute
// the amount of people at age x per day.
var logUser = function(gender, age) {
  age = age + '';

  var prefix = 'skynet:v0.2:debug';

  client.incr(prefix + ':alltime:people');
  client.incr(prefix + ':alltime:' + gender);

  var date = getDay();

  client.incr(prefix + ':day:' + date + ':people');
  client.incr(prefix + ':day:' + date + ':' + gender);

  var minute = getMinute() + '';

  client.zincrby(prefix + ':day:' + date + ':people:set', 1, minute);
  client.zincrby(prefix + ':day:' + date + ':' + gender + ':set', 1, minute);

  client.zincrby(prefix + ':day:' + date + ':people:age:set', 1, age);
  client.zincrby(prefix + ':day:' + date + ':' + gender + ':age:set', 1, age);
}

exports.user = logUser;
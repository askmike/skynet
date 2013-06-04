var _ = require('underscore');
var moment = require('moment');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if(process.argv.ddk)
  mongoose.connect('mongodb://localhost/skynet');
else
  mongoose.connect('mongodb://localhost/skynet-sgg');

// 
//        2 segments: male and female
// 

// 
// Each vine movie
var vineSchema = Schema({
  // meta
  url: { type: String, unique: true, index: true },
  duration: { type: Number, default: 6 },
  added: { type: Date, default: Date.now },
  // theme
  theme: String,
  segment: String,
}, {collection: 'vines'});
var Vine = mongoose.model('vines', vineSchema);


//
// Each theme (eg. `cute animals`)
var themeSchema = Schema({
  // meta
  name: { type: String, unique: true, index: true },
  segment: String,
}, {collection: 'themes'});
var Theme = mongoose.model('themes', themeSchema);


// a state is either adaptive or non-adaptive of the client system
// one state holds the information of all played vines in a small timeframe and everyone who viewed it
var stateSchema = Schema({
  adaptive: { type: Boolean, unique: false, index: true },
  start: { type: Date, index: true },
  end: { type: Date, index: true },
  // all vines played from within this state
  plays: [
    {
      id: Number,
      start: Date,
      end: Date
    }
  ],
  // all screen views played from within this state
  views: [
    {
      type: String, // either attention, in-view or ..
      segment: String,
      age: Number,
      start: Date,
      end: Date
    }
  ]
}, {collection: 'states'});
var State = mongoose.model('states', stateSchema);

exports.Vine = Vine;
exports.Theme = Theme;
exports.State = State;

var state;

var setDates = function() {
  state.plays = _.map(state.plays, function(p) {
    p.start = new Date(p.start);
    p.end = new Date(p.end)
    return p;
  });
}

var now = function() {
  return moment().format('DD-MM HH:mm:ss');
}

var refresh = function() {
  // save
  if(state) {
    setDates();

    var startTimes = _.pluck(state.plays, 'start');
    state.start = _.max(startTimes);

    var endTimes = _.pluck(state.plays, 'end');
    state.end = _.min(endTimes);

    new State(state).save(function(err) {
      if(err)
        console.log('ERR', err);
      console.log(now(), 'SAVED STATE');
    });
  }

  // reset
  state = {
    adaptive: true,
    start: new Date,
    end: new Date,
    plays: [],
    views: [],
  };
}

// refresh();
refresh();
setInterval(refresh, 15 * 60 * 1000); // 30 min

var storeVine = function(vine) {
  if(vine.url)
    delete vine.url;

  state.plays.push(vine);
}

var storeView = function(view) {
  state.views.push(view);
}

exports.storeView = storeView;
exports.storeVine = storeVine;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/skynet');

// 
//        2 segments: male and female
// 


// 
// Each vine movie
var vineSchema = Schema({
  // meta
  url: { type: String, unique: true, index: true },
  duration: Number,
  added: { type: Date, default: Date.now },
  // theme
  theme: String,
  segment: String,
}, {collection: 'vines'});
exports.Vine = mongoose.model('vines', vineSchema);


//
// Each theme (eg. `cute animals`)
var themeSchema = Schema({
  // meta
  name: { type: String, unique: true, index: true },
  segment: String,
}, {collection: 'themes'});
exports.Theme = mongoose.model('themes', themeSchema);


// a state is either adaptive or non-adaptive of the client system
// one state holds the information of all played vines in a small timeframe and everyone who viewed it
var stateSchema = Schema({
  adaptive: { type: Boolean, unique: true, index: true },
  start: { type: Date, index: true },
  end: { type: Date, index: true },
  // all vines played from within this state
  plays: [
    {
      url: String,
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
exports.State = mongoose.model('states', stateSchema);
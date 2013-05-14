var moment = require('moment');
var _ = require('underscore');
var mongo = require('./mongoose.js');


// The segment method is responsible for 
// deciding for what segment content should
// be displayed.
// 
// This method is build around an audience
// system wich sends an update every second
// per active user watching the screen
var winner;
module.exports.segment = (function() {
  var segments = {
    'female': [],
    'male': []
  };


  // when we haven't heard about a person for 2 seconds 
  // we remove it from the list
  var cleanup = function() {
    var treshold = moment().subtract('seconds', 2);
    _.each(segments, function(list, segment) {
      _.each(list, function(view, i) {
        if(view < treshold)
          delete segments[segment][i];
      });
    });
  }

  var decideSegment = function(newSegment) {
    cleanup();

    segments[ newSegment ].push( moment() )
    
    // get the segment with the most viewers currently 
    // watching the screen
    var winningList = _.max(segments, function(seg) { return seg.length});
    _.each(segments, function(list, seg) {
      if(list === winningList)
        return winner = seg;
        
    });
    
  };

  return decideSegment;

})();


// pick a theme based on the current dominant segment
// 
// NOT USED & NOT FINISHED
module.exports.theme = (function() {
  var themes;

  var reloadTreshold = moment().add('minutes', 30);
  reloadThemes = function(cb) {
    // get all themes out of mongo
    
    reloadTreshold = moment().add('minutes', 30);
  }

  var decideTheme = function() {
    if(reloadTreshold < treshold)
      return reloadTreshold(decideTheme);

  }

  return decideTheme;
})();


module.exports.vine = (function() {
  var Vine = mongo.Vine;
  var vines = {
    male: [],
    female: []
  };

  getVines = function() {
    Vine.find({}).lean().exec(function(err, mongoVines) {
      _.each(mongoVines, function(vine) {
        vines[ vine.segment ].push( vine );
      });
    });
  };
  getVines();

  return function(segment) {
    return vines[ segment ][ 
      Math.round( Math.random() * (vines[segment].length - 1) )
    ];
  }

}());
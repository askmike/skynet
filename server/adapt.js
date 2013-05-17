var moment = require('moment');
var _ = require('underscore');
var mongo = require('./mongoose.js');


var Decider = function() {
  this.segments = {
    'female': [],
    'male': []
  };
  this.winningSegment;

  _.bindAll(this);
}

Decider.prototype.__proto__ = require('events').EventEmitter.prototype;

// The segment method is responsible for 
// deciding for what segment content should
// be displayed.
// 
// This method is build around an audience
// system wich sends an update every second
// per active user watching the screen
Decider.prototype.cleanSegments = function() {
  var treshold = moment().subtract('seconds', 2);
  _.each(this.segments, function(list, segment) {
    _.each(list, function(view, i) {
      if(view < treshold)
        this.segments[segment].splice(i, 1);
    }, this);
  }, this);
}
Decider.prototype.segment = function(newSegment) {
  this.cleanSegments();

  this.segments[ newSegment ].push( moment();

  // get the segment with the most viewers currently 
  // watching the screen
  var winningList = _.max(this.segments, function(seg) { return seg.length});
  _.each(this.segments, function(list, seg) {
    if(list === winningList) {
      // winner
      if(this.winningSegment !== seg) {
        this.winningSegment = seg;
        this.emit('new segment', this.winningSegment);
      }
    }
  }, this);
}

// based on the current winning segment
// select a vine to show
// module.exports.vine = (function() {
//   var Vine = mongo.Vine;
//   var vines = {
//     male: [],
//     female: []
//   };

//   getVines = function() {
//     Vine.find({}).lean().exec(function(err, mongoVines) {
//       _.each(mongoVines, function(vine) {
//         vines[ vine.segment ].push( vine );
//       });
//     });
//   };
//   getVines();

//   return function(segment) {
//     return vines[ segment ][ 
//       Math.round( Math.random() * (vines[segment].length - 1) )
//     ];
//   }
// }());





// The segment method is responsible for 
// deciding for what segment content should
// be displayed.
// 
// This method is build around an audience
// system wich sends an update every second
// per active user watching the screen
// module.exports.segment = (function() {
//   var segments = {
//     'female': [],
//     'male': []
//   };

//   // when we haven't heard about a person for 2 seconds 
//   // we remove it from the list
//   var cleanup = function() {
//     var treshold = moment().subtract('seconds', 2);
//     _.each(segments, function(list, segment) {
//       _.each(list, function(view, i) {
//         if(view < treshold)
//           delete segments[segment][i];
//       });
//     });
//   }

//   var decideSegment = function(newSegment) {
//     cleanup();

//     segments[ newSegment ].push( moment() )
    
//     // get the segment with the most viewers currently 
//     // watching the screen
//     var winningList = _.max(segments, function(seg) { return seg.length});
//     _.each(segments, function(list, seg) {
//       if(list === winningList)
//         return winner = seg;
        
//     });
    
//   };

//   return decideSegment;

// })();


// pick a theme based on the current dominant segment
// 
// NOT USED & NOT FINISHED
// module.exports.theme = (function() {
//   var themes;

//   var reloadTreshold = moment().add('minutes', 30);
//   reloadThemes = function(cb) {
//     // get all themes out of mongo
    
//     reloadTreshold = moment().add('minutes', 30);
//   }

//   var decideTheme = function() {
//     if(reloadTreshold < treshold)
//       return reloadTreshold(decideTheme);

//   }

//   return decideTheme;
// })();


// module.exports.vine = (function() {
//   var Vine = mongo.Vine;
//   var vines = {
//     male: [],
//     female: []
//   };

//   getVines = function() {
//     Vine.find({}).lean().exec(function(err, mongoVines) {
//       _.each(mongoVines, function(vine) {
//         vines[ vine.segment ].push( vine );
//       });
//     });
//   };
//   getVines();

//   return function(segment) {
//     return vines[ segment ][ 
//       Math.round( Math.random() * (vines[segment].length - 1) )
//     ];
//   }

// }());

module.exports = Decider;

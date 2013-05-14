var moment = require('moment');
var _ = require('underscore');

// the segment method is responsible for 
// deciding for what segment content should
// be displayed
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
    
    // get the segment with the most viewers
    var winner = _.max(segments, function(seg) { return seg.length});

    // what is the name of the list?
    _.each(segments, function(list, seg) {
      if(list === winner)
        return winner;
    })
    
  };

  return decideSegment;

})();
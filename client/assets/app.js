var port = 1340;

var listen = function(vines) {
  var allVines = [];
  _.each(vines.themes, function(t) {
    allVines = allVines.concat(t.vines);
  });

  console.log('loaded vines', 'listening');

  var socket = io.connect('http://mvr.me:' + port);

  socket.on('newSegment', function(data) {
    updateContent(data.segment);
  });

  socket.on('refresh', restart);

  var el = $('main');
  var template = function(vine) {
    return '<video loop preload="auto" muted="true" src="' + vine + '"></video>';
  }

  var currentSegment;

  var next, last;
  var updateContent = function(segment) {
    if(!segment)
      segment = currentSegment
    else {
      console.log('new segment:', segment);
      clearTimeout(next);
    }
    currentSegment = segment;
    var seg = vines.segments[segment];
    var ti = Math.round(Math.random() * (seg.length - 1));
    var theme = seg[ti];
    var themeName;
    _.each(vines.themes, function(t, n) {
      if(theme === n) {
        themeName = n;
        theme = t;
      }
    });
    var vi = Math.round(Math.random() * (_.size(theme) - 1));
    console.log('selected', 'vine:', vi, 'from theme: ', themeName);
    var vine = theme[vi];

    if(last === vine) {
      console.log('same as last, rerolling');
      return updateContent();
    }

    last = vine;

    el
      .html( template( vine.vine ) )
      .children()
        .get(0) 
          .play();

    next = setTimeout(updateContent, 7000);
  }
};

var el = $('main');

var restart = function() {
  console.log('RESTARTING NOW');
  location.reload(true);
}

var restartAfter = function(ms) {
  if(ms < 0)
    return; // else infi loop ))<>((
  setTimeout(restart, ms);
}

var msUntil = function(mom) {
  return toMoment = mom.diff(moment());
}

var pointInDay = function(hours, minutes, seconds) {
  var now = new Date;
  var point = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours, minutes, seconds
  );
  return moment(point);
}

var restartSkynet = function() {
  var earlyBirds = pointInDay(5, 0, 0);
  var startOfDay = pointInDay(7, 55, 0);
  var endOfDay = pointInDay(18, 0, 0);
  var midnight = pointInDay(0, 0, 0).add('d', 1);

  restartAfter(msUntil(earlyBirds));
  restartAfter(msUntil(startOfDay));
  restartAfter(msUntil(endOfDay));
  restartAfter(msUntil(midnight));
}

var init = function() {
  restartSkynet();
  var page = $('html').data('page');

  $('body').show();

  console.log('start', moment().format('HH:mm:ss'));
  $.getJSON('vines.json', listen);
};

$(init);

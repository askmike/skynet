var init = function() {
  var socket = io.connect('http://localhost:1337');

  $('body').show();

  socket.on('newSegment', function(data) {
    updateContent(data.segment);
  });

  var el = $('main'), current;
  var segmentEls = {
    male: el.find('.male'),
    female: el.find('.female')
  }

  var updateContent = function(segment) {
    if(segment === current)
      return;

    el
      .removeClass()
      .addClass(segment)
      .children()
        .hide()
        .each(function() {
          this.pause();
        });


      segmentEls[segment]
        .show()
        .get(0)
          .play();

    current = segment;
  }
};

$(init);
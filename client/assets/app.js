var init = function() {
  var socket = io.connect('http://mvr.me:1340');

  var page = $('html').data('page');

  $('body').show();

  if(page === 'client')
    listen(socket);
  else if(page === 'cp')
    talk(socket);

  
};

var listen = function(socket) {

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
}

var talk = function(socket) {
  var current = 'male';
  $('.segment').on('click', function(e) {
    e.preventDefault();
    var segment = $(this).data('segment');
    if(segment === current)
      return;
    console.log('emitting new segment', segment);
    socket.emit('updateSegment', {segment: segment});
    current = segment;
  });
}

$(init);
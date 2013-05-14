var init = function() {
  var socket = io.connect('http://mvr.me:1340');

  var page = $('html').data('page');

  $('body').show();

  listen(socket);  
};

var listen = function(socket) {

  socket.on('newVine', function(data) {
    updateContent(data.segment);
  });

  var el = $('main');
  var template = function(vine) {
    return '<video loop preload="auto" src="' + vine + '"></video>';
  }

  var updateContent = function(vine) {
    el
      .html( template( vine ) )
      .children()
        .get(0) 
          .play();
  }
};

$(init);
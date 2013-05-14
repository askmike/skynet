 $(function() {

  var views = {
    sidebar: new sn.views.Sidebar({
      template: 'sidebar',
      el: '.span3'
    }),
    main: new sn.views.Main({
      template: 'main',
      el: '.span9'
    })
  };

  var models = {
   today: new sn.models.Today(),
   last: new sn.models.Last(),
   history: new sn.models.History()
  };


  _.each(models, function(i, m) {
    models[ m ].fetch();
  });


  models.today.on('change',function() {
    _.each(views, function(i, n) {
      views[ n ].drawToday(models.today.toJSON())
    });
  });

  models.last.on('change',function() {
    views.sidebar.drawLast(models.last.toJSON())
  });

  models.history.on('change', function() {
    views.main.drawHistory(models.history.toJSON())
  })

});
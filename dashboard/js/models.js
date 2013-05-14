(function(sn) {

  sn = sn || {};
  var models = {};
  var collections = {};

  var Model = Backbone.Model;
  var Collection = Backbone.Collection;

  var BASE_URL = '';

  models.Today = Model.extend({
    url: '/api/today'
  });

  models.Last = Model.extend({
    url: '/api/last'
  });

  models.History = Model.extend({
    url: '/api/last'
  });

  sn.models = models;
  sn.collections = collections;

}(sn));
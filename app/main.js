/*jslint white: true, nomen: true, maxlen: 120, */
/*global require:false */

require.config({
  baseUrl: './',
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }
});

require(['jquery', 'underscore', 'backbone', 'model', 'view'], function($, _, Backbone, Counter, View) {
  'use strict';
  $(function() {
    var view = new View({model: new Counter()}).render();
    $('body').html(view.$el);
  });
});

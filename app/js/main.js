/*jslint white: true, nomen: true, maxlen: 120, */
/*global require:false */

require.config({
  baseUrl: './js/',
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    mustache: 'lib/mustache'
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

require(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  'use strict';
  $(function() {
    // var view = new View({model: new Counter()}).render();
    // $('body').html(view.$el);
  });
});

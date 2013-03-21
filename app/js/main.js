/*jslint white: true, nomen: true, maxlen: 120, */
/*global require:false */

require.config({
  baseUrl: './js/',
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    'backbone.viewmodel': 'lib/view-model',
    mustache: 'lib/mustache',
    'jquery.mustache': 'lib/jquery.mustache'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'backbone.viewmodel': {
      deps: ['backbone']
    },
    'jquery.mustache': {
      deps: ['jquery']
    }
  }
});
require([
  'jquery', 'underscore', 'backbone',
  'views/textField.view',
  'views/buttons.view',
  'viewmodels/calculator.viewmodel',
  'models/calculation.model',
  'mustache', 'jquery.mustache', 'backbone.viewmodel'
], function($, _, Backbone, TextField, 
            Buttons, Calculator, Calculation) {
  'use strict';
  $(function() {
    var model = new Calculation(),
        viewmodel = new Calculator({
          source_model: model
        }),
        buttons = new Buttons({model: viewmodel}).render(),
        textField = new TextField({model: viewmodel}).render();
    
    $('#calcBody')
      .append(textField.$el)
      .append(buttons.$el);
  });
});

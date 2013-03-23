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
    text: 'lib/text'
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
    }
  }
});
require([
  'jquery', 'underscore', 'backbone',
  'views/textField.view',
  'views/buttons.view',
  'viewmodels/calculator.viewmodel',
  'models/calculation.model',
  'mustache',
  'backbone.viewmodel'
], function(
  $, _, Backbone,
  TextField,
  Buttons,
  Calculator,
  Calculation
) {
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

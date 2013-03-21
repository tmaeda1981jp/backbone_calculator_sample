/*jslint white: true, nomen: true, maxlen: 120, plusplus: true, */
/*global _:false, $:false, define:false, require:false, */

define([
  'jquery', 'underscore', 'backbone'
], function($, _, Backbone) {
  'use strict';

  return Backbone.View.extend({
    tagName: 'p',
    id: 'buttonsArea',

    events: {
      'click .digit': 'onClickDigit',
      'click .operation': 'onClickOperation',
      'click .clear': 'onClickClear'
    },

    initialize: function() {
      _.bindAll(this, 'onClickDigit', 'onClickOperation', 'onClickClear');
    },

    render: function() {
      var self = this;
      $.Mustache.load('templates/calc.tmpl.html').done(function() {
        self.$el.mustache('buttons');
      });
      return this;
    },

    onClickDigit: function(event) {
      var inputed = $(event.target).val().toString();
      this.model.setInputValue(inputed);
    },

    onClickOperation: function(event) {
      this.model.calculate();
      this.model.changeOperationState($(event.target).val());
    },

    onClickClear: function(event) {
      this.model.reset();
    }
  });
});

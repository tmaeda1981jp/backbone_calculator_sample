/*jslint white: true, nomen: true, maxlen: 120, plusplus: true, */
/*global _:false, $:false, define:false, require:false, */

define([
  'jquery', 'underscore', 'backbone'
], function($, _, Backbone) {
  'use strict';

  var _LOG =  function(model) {
    console.log("--------------");
    console.log('CURRENT   : ' + model.get('userInputText'));
    console.log('OPERATION : ' + model.get('operationState'));
    console.log('TEMPORARY : ' + model.get('temporaryValue'));
    console.log('initField : ' + model.get('initializeTextField'));
  };

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
      _LOG(this.model);
    },

    onClickOperation: function(event) {
      this.model.calculate();
      this.model.changeOperationState($(event.target).val());
      _LOG(this.model);
    },

    onClickClear: function(event) {
      this.model.reset();
      _LOG(this.model);
    }
  });
});

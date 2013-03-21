/*jslint white: true, nomen: true, maxlen: 120, plusplus: true, browser: true, */
/*global _:false, $:false, define:false, require:false, */

define([
  'jquery', 'underscore', 'backbone'
], function($, _, Backbone) {
  'use strict';

  return Backbone.View.extend({
    tagName: 'p',
    id: 'inputArea',
    className: 'row',

    initialize: function() {
      var self = this;
      this.listenTo(this.model, 'change:userInputText', this.updateCurrent);
      this.model.on('errorOccurred', function(message) {
        window.alert(message);
      });
    },

    render: function() {
      var self = this;
      $.Mustache.load('templates/calc.tmpl.html').done(function() {
        self.$el.mustache('textField');
        self.updateCurrent(self.model);
      });
      return this;
    },

    updateCurrent: function(model) {
      this.$el.find('input').val(model.get('userInputText'));
    }
  });
});

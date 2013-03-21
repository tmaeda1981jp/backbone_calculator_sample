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
      this.listenTo(this.model, 'change:userInputText', this.updateTextField);
      this.model.on('errorOccurred', function(message) {
        window.alert(message);
      });
    },

    render: function() {
      var self = this;
      // Chromeだとエラー
      $.Mustache.load('templates/calc.tmpl.html').done(function() {
        self.$el.mustache('textField');
        self.updateTextField(self.model);
      });
      return this;
    },

    updateTextField: function(model) {
      this.$el.find('input').val(model.get('userInputText'));
    }
  });
});

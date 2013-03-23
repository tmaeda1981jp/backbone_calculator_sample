/*jslint white: true, nomen: true, maxlen: 120, plusplus: true, browser: true, */
/*global _:false, $:false, define:false, require:false, */

define([
  'jquery', 'underscore', 'backbone',
  'mustache', 'text!../../templates/textField.tmpl.html'
], function($, _, Backbone, Mustache, template) {
  'use strict';

  return Backbone.View.extend({
    tagName: 'p',
    id: 'inputArea',
    className: 'row',

    initialize: function() {
      this.listenTo(this.model, 'change:userInputText', this.updateTextField);
      this.model.on('errorOccurred', function(message) {
        window.alert(message);
      });
    },

    render: function() {
      this.$el.html(Mustache.to_html(template));
      this.updateTextField(this.model);
      return this;
    },

    updateTextField: function(model) {
      this.$el.find('input').val(model.get('userInputText'));
    }
  });
});

/*jslint white: true, nomen: true, maxlen: 120, plusplus: true, */
/*global _:false, $:false, define:false, require:false, */

define([
  'backbone', 'underscore', '../models/calculation.model', 'backbone.viewmodel'
], function(Backbone, _, Calculation) {
  'use strict';

  return Backbone.ViewModel.extend({
    
    defaults: {
      userInputText: '0',
      operationState: 'NO_OPERATION',
      initializeTextField: true,
      temporaryValue: 0 // modelの方が良い？
    },

    setInputValue: function(input) {
      var userInputText = this.get('userInputText');
      if (userInputText === '0' || this.get('initializeTextField')) {
        this.set('userInputText', input);
      }
      else {
        this.set('userInputText', userInputText + input);
      }
      this.set('initializeTextField', false);
    },

    changeOperationState: function(operation) {
      switch(operation) {
      case '+': this.set('operationState', 'ADD');break;
      case '-': this.set('operationState', 'SUBTRACT');break;
      case '*': this.set('operationState', 'MULTIPLY');break;
      case '/': this.set('operationState', 'DIVIDE');break;
      default:  this.set('operationState', 'NO_OPERATION');break;
      }
      this.set('initializeTextField', true);
    },

    calculate: function() {
      if (this.get('initializeTextField')) { return; }
      var model = this.get('source_model'),
          currentInput = parseInt(this.get('userInputText'), 10),
          temporaryValue = parseInt(this.get('temporaryValue'), 10),
          result;

      try {
        switch(this.get('operationState')) {
        case 'ADD':
          result = model.add(currentInput, temporaryValue);
          break;
        case 'SUBTRACT':
          result = model.subtract(temporaryValue, currentInput);
          break;
        case 'MULTIPLY':
          result = model.multiply(currentInput, temporaryValue);
          break;
        case 'DIVIDE':
          result = model.divide(temporaryValue, currentInput);
          break;
        case 'NO_OPERATION':
          this.set('temporaryValue', currentInput);
          break;
        }
      } catch (e) {
        this.trigger('errorOccurred', e.message);
        this.reset();
      }

      if (!_.isUndefined(result)) {
        this.set({
          userInputText: result,
          temporaryValue: result
        });        
      }
    },

    reset: function() {
      this.set('userInputText', '0');
      this.set('temporaryValue', 0);
      this.set('operationState', 'NO_OPERATION');
    }
  });
});

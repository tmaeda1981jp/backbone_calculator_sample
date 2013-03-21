/*jslint white: true, nomen: true, maxlen: 120, plusplus: true, */
/*global _:false, $:false, define:false, require:false, */

define(['backbone', '../exceptions/zeroDivideError'], function(Backbone, ZeroDivideError) {
  'use strict';

  return Backbone.Model.extend({
    
    add: function(p1, p2) {
      return p1 + p2;
    },

    subtract: function(p1, p2) {
      return p1 - p2;
    },

    multiply: function(p1, p2) {
      return p1 * p2;
    },

    divide: function(p1, p2) {
      if (p2 === 0) {
        throw new ZeroDivideError('ゼロ除算はできません．');
      }
      return p1 / p2;
    }
  });
});

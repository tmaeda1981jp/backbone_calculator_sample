/*jslint white: true, nomen: true, maxlen: 120, plusplus: true, */
/*global _:false, $:false, define:false, require:false, */

define([], function() {
  'use strict';
  var RuntimeException = function(message) {
    this.name = "RuntimeException";
    this.message = message;
    this.description = this.name + ': mssage ' + this.message;
  };
  RuntimeException.prototype = new Error();
  return RuntimeException;
});

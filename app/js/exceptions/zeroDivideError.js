/*jslint white: true, nomen: true, maxlen: 120, plusplus: true, */
/*global _:false, $:false, define:false, require:false, */

define(['./runtimeException'], function(RuntimeException) {
  'use strict';

  var ZeroDivideError = function(message) {
    this.name = "ZeroDivideError";
    this.message = message;
  };

  ZeroDivideError.prototype = new RuntimeException();
  return ZeroDivideError;
});

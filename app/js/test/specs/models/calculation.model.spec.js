/*jslint white: true, nomen: true, maxlen: 120, plusplus: true, */
/*global _:false, $:false, define:false, require:false, describe:false,
 it:false, before:false, after:false, beforeEach:false, afterEach:false, 
 sinon:false, context:false, */

define([
  '../../../models/calculation.model',
  '../../../exceptions/zeroDivideError'
], function(Model, ZeroDivideError) {
  'use strict';

  describe('models/calculation.model', function() {
    var model;
    beforeEach(function() {
      model = new Model();
    });

    describe('#add', function() {
      it('1 + 1 = 2', function() {
        model.add(1, 1).should.equal(2);
      });
      it('-1 + -1 = 2', function() {
        model.add(-1, -1).should.equal(-2);
      });
      it('1 + -2 = -1', function() {
        model.add(1, -2).should.equal(-1);
      });
    });

    describe('#subtract', function() {
      it('1 - 1 = 0', function() {
        model.subtract(1, 1).should.equal(0);
      });
      it('-1 - -1 = 0', function() {
        model.subtract(-1, -1).should.equal(0);
      });
      it('-1 - 2 = -3', function() {
        model.subtract(-1, 2).should.equal(-3);
      });
    });

    describe('#multiply', function() {
      it('1 * 1 = 1', function() {
        model.multiply(1, 1).should.equal(1);
      });
      it('-1 * -1 = 1', function() {
        model.multiply(-1, -1).should.equal(1);
      });
      it('1 * -1 = -1', function() {
        model.multiply(1, -1).should.equal(-1);
      });
    });

    describe('#divide', function() {
      it('1 / 1 = 1', function() {
        model.divide(1, 1).should.equal(1);
      });
      it('-1 / -1 = 1', function() {
        model.divide(-1, -1).should.equal(1);
      });
      it('1 / -1 = -1', function() {
        model.divide(1, -1).should.equal(-1);
      });
      it('0 / 1 = 0', function() {
        model.divide(0, 1).should.equal(0);
      });
      it('0除算しようとするとErrorがthrowされること', function() {
        (function() {
          model.divide(1, 0);
        }).should.throw();
      });
    });
  });
});

/*jslint white: true, nomen: true, maxlen: 120, browser:true, */
/*global require:false */
require.config({
  baseUrl: '../',
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    'backbone.viewmodel': 'lib/view-model',
    mocha: 'test/node_modules/mocha/mocha',
    sinon: 'test/node_modules/sinon/pkg/sinon',
    chai: 'test/node_modules/chai/chai',
    schai: 'test/node_modules/sinon-chai/lib/sinon-chai'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'backbone.viewmodel': {
      deps: ['backbone']
    },
    mocha: {
      exports: 'mocha'
    },
    sinon: {
      exports: 'sinon'
    }
  }
});

require([
  'jquery', 'underscore', 'backbone', 'mocha', 'sinon', 'chai', 'schai'
], function($, _, Backbone, mocha, sinon, chai, schai, model) {
  'use strict';

  mocha.ui('bdd');
  mocha.reporter('html');
  chai.should();
  window.expect = chai.expect;

  require([
    'test/specs/models/calculation.model.spec',
    'test/specs/viewmodels/calculator.viewmodel.spec'
  ], function(
    Calculation, Calculator
  ) {
    if (window.mochaPhantomJS) {
      window.mochaPhantomJS.run();
    }
    else {
      mocha.run();
    }
  });
});

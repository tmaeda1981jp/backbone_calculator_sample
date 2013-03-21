/*jslint white: true, nomen: true, maxlen: 120, plusplus: true, */
/*global _:false, $:false, define:false, require:false, describe:false,
 it:false, before:false, after:false, beforeEach:false, afterEach:false, 
 sinon:false, context:false, */

define([
  '../../../models/calculation.model',
  '../../../viewmodels/calculator.viewmodel'
], function(Calculation, Calculator) {
  'use strict';

  describe('viewmodels/calculator.viewmodel', function() {

    // setInputValueのテスト
    describe('#setInputValue', function() {
      context('userInputTextが"0"の場合', function() {
        it('パラメータの値でuserInputTextを上書きすること', function() {
          // setup
          var viewmodel = new Calculator({
            source_model: new Calculation()
          });
          viewmodel.set('userInputText', '0');
          viewmodel.get('userInputText').should.equal('0');

          // excercise
          viewmodel.setInputValue('5');

          // verify
          viewmodel.get('userInputText').should.equal('5');
        });
      });
      context('userInputTextが"0"以外の場合', function() {
        context('initializeTextFieldがtrueの場合', function() {
          it('パラメータの値でuserInputTextを上書きすること', function() {
            // setup
            var viewmodel = new Calculator({
              source_model: new Calculation()
            });
            viewmodel.set({
              userInputText: '10',
              initializeTextField: true
            });
            viewmodel.get('userInputText').should.equal('10');

            // excercise
            viewmodel.setInputValue('5');

            // verify
            viewmodel.get('userInputText').should.equal('5');
          });
        });
        context('initializeTextFieldがfalseの場合', function() {
          it('userInputTextの後ろにパラメータの値を連結させること', function() {
            // setup
            var viewmodel = new Calculator({
              source_model: new Calculation()
            });
            viewmodel.set({
              userInputText: '10',
              initializeTextField: false
            });
            viewmodel.get('userInputText').should.equal('10');

            // excercise
            viewmodel.setInputValue('5');

            // verify
            viewmodel.get('userInputText').should.equal('105');
          });
        });
      });
    });

    // changeOperationStateのテスト
    describe('#changeOperationState', function() {
      var viewmodel;
      beforeEach(function() {
        viewmodel = new Calculator({
          source_model: new Calculation()
        });
      });
      it('パラメータが"+"の場合，operationStateが"ADD"になること', function() {
        viewmodel.changeOperationState('+');
        viewmodel.get('operationState').should.equal('ADD');
      });
      it('パラメータが"-"の場合，operationStateが"SUBTRACT"になること', function() {
        viewmodel.changeOperationState('-');
        viewmodel.get('operationState').should.equal('SUBTRACT');
      });
      it('パラメータが"*"の場合，operationStateが"MULTIPLY"になること', function() {
        viewmodel.changeOperationState('*');
        viewmodel.get('operationState').should.equal('MULTIPLY');
      });
      it('パラメータが"/"の場合，operationStateが"DIVIDE"になること', function() {
        viewmodel.changeOperationState('/');
        viewmodel.get('operationState').should.equal('DIVIDE');
      });
      it('パラメータが"hoge"の場合，operationStateが"NO_OPERATION"になること', function() {
        viewmodel.changeOperationState('hoge');
        viewmodel.get('operationState').should.equal('NO_OPERATION');
      });
      it('パラメータが空文字の場合，operationStateが"NO_OPERATION"になること', function() {
        viewmodel.changeOperationState('');
        viewmodel.get('operationState').should.equal('NO_OPERATION');
      });
      it('パラメータがundefinedの場合，operationStateが"NO_OPERATION"になること', function() {
        viewmodel.changeOperationState();
        viewmodel.get('operationState').should.equal('NO_OPERATION');
      });
      it('initializeTextFieldがtrueになること', function() {
        viewmodel.set('initializeTextField', false);
        viewmodel.changeOperationState();
        viewmodel.get('initializeTextField').should.be.true;
      });
    });

    // calculateのテスト
    describe('#calculate', function() {
      context('initializeTextFieldがtrueの場合', function() {
        it('なにもしないこと', function() {

          // setup
          var viewmodel = new Calculator({
            source_model: new Calculation()
          });
          viewmodel.set({
            initializeTextField: true,
            userInputText: '123',
            temporaryValue: 15,
            operationState: 'ADD'
          });

          // exercise
          viewmodel.calculate();

          // verify
          viewmodel.get('initializeTextField').should.be.true;
          viewmodel.get('userInputText').should.equal('123');
          viewmodel.get('temporaryValue').should.equal(15);
          viewmodel.get('operationState').should.equal('ADD');
        });
      });
      context('initializeTextFieldがfalseの場合', function() {
        context('operationStateが"ADD"の場合', function() {
          var viewmodel;
          beforeEach(function() {
            viewmodel = new Calculator({
              source_model: new Calculation()
            });
            viewmodel.set({
              initializeTextField: false,
              userInputText: '123',
              temporaryValue: 456,
              operationState: 'ADD'
            });
          });
          it('userInputTextとtemporaryValueの値を加算した結果がuserInputTextに設定されること', function() {
            viewmodel.calculate();
            viewmodel.get('userInputText').should.equal(579);
          });
          it('userInputTextとtemporaryValueの値を加算した結果がtemporaryValueに設定されること', function() {
            viewmodel.calculate();
            viewmodel.get('temporaryValue').should.equal(579);
          });
        });
        context('operationStateが"SUBTRACT"の場合', function() {
          var viewmodel;
          beforeEach(function() {
            viewmodel = new Calculator({
              source_model: new Calculation()
            });
            viewmodel.set({
              initializeTextField: false,
              userInputText: '123',
              temporaryValue: 456,
              operationState: 'SUBTRACT'
            });
          });
          it('userInputTextとtemporaryValueの値を減算した結果がuserInputTextに設定されること', function() {
            viewmodel.calculate();
            viewmodel.get('userInputText').should.equal(333);
          });
          it('userInputTextとtemporaryValueの値を減算した結果がtemporaryValueに設定されること', function() {
            viewmodel.calculate();
            viewmodel.get('temporaryValue').should.equal(333);
          });
        });
        context('operationStateが"MULTIPLY"の場合', function() {
          var viewmodel;
          beforeEach(function() {
            viewmodel = new Calculator({
              source_model: new Calculation()
            });
            viewmodel.set({
              initializeTextField: false,
              userInputText: '5',
              temporaryValue: 6,
              operationState: 'MULTIPLY'
            });
          });
          it('userInputTextとtemporaryValueの値を乗算した結果がuserInputTextに設定されること', function() {
            viewmodel.calculate();
            viewmodel.get('userInputText').should.equal(30);
          });
          it('userInputTextとtemporaryValueの値を乗算した結果がtemporaryValueに設定されること', function() {
            viewmodel.calculate();
            viewmodel.get('temporaryValue').should.equal(30);
          });
        });
        context('operationStateが"DIVIDE"の場合', function() {
          var viewmodel;
          beforeEach(function() {
            viewmodel = new Calculator({
              source_model: new Calculation()
            });
            viewmodel.set({
              initializeTextField: false,
              userInputText: '5',
              temporaryValue: 20,
              operationState: 'DIVIDE'
            });
          });
          it('userInputTextとtemporaryValueの値を除算した結果がuserInputTextに設定されること', function() {
            viewmodel.calculate();
            viewmodel.get('userInputText').should.equal(4);
          });
          it('userInputTextとtemporaryValueの値を除算した結果がtemporaryValueに設定されること', function() {
            viewmodel.calculate();
            viewmodel.get('temporaryValue').should.equal(4);
          });
        });
        context('operationStateが"NO_OPERATION"の場合', function() {
          var viewmodel;
          beforeEach(function() {
            viewmodel = new Calculator({
              source_model: new Calculation()
            });
            viewmodel.set({
              initializeTextField: false,
              userInputText: '5',
              temporaryValue: 20,
              operationState: 'NO_OPERATION'
            });
          });
          it('userInputTextの値をtemporaryValueに設定すること', function() {
            viewmodel.calculate();
            viewmodel.get('temporaryValue').should.equal(5);
          });
        });

        context('演算処理でエラーが発生した(エラーがthrowされた)場合', function() {
          var viewmodel, sourceModel, stub;
          beforeEach(function() {
            sourceModel = new Calculation();
            stub = sinon.stub(sourceModel, 'add').throws();
            viewmodel = new Calculator({
              source_model: sourceModel
            });
            viewmodel.set({
              initializeTextField: false,
              userInputText: '123',
              temporaryValue: 15,
              operationState: 'ADD'
            });
          });
          afterEach(function() {
            stub.restore();
          });
          it('errorOccurredイベントがkickされること', function() {
            var spy = sinon.spy();
            viewmodel.on('errorOccurred', spy);
            viewmodel.calculate();
            spy.callCount.should.equal(1);
          });
          it('userInputTextに"0"が設定されること', function() {
            viewmodel.get('userInputText').should.equal('123');
            viewmodel.reset();
            viewmodel.get('userInputText').should.equal('0');
          });
          it('temporaryValueに0が設定されること', function() {
            viewmodel.get('temporaryValue').should.equal(15);
            viewmodel.reset();
            viewmodel.get('temporaryValue').should.equal(0);
          });
          it('operationStateに"NO_OPERATIONが設定されること', function() {
            viewmodel.get('operationState').should.equal('ADD');
            viewmodel.reset();
            viewmodel.get('operationState').should.equal('NO_OPERATION');
          });
        });
      });
    });

    // resetのテスト
    describe('#reset', function() {
      var viewmodel;
      beforeEach(function() {
        viewmodel = new Calculator({
          source_model: new Calculation()
        });
        viewmodel.set({
          userInputText: '123',
          temporaryValue: 15,
          operationState: 'ADD'
        });
      });
      it('userInputTextに"0"が設定されること', function() {
        viewmodel.get('userInputText').should.equal('123');
        viewmodel.reset();
        viewmodel.get('userInputText').should.equal('0');
      });
      it('temporaryValueに0が設定されること', function() {
        viewmodel.get('temporaryValue').should.equal(15);
        viewmodel.reset();
        viewmodel.get('temporaryValue').should.equal(0);
      });
      it('operationStateに"NO_OPERATIONが設定されること', function() {
        viewmodel.get('operationState').should.equal('ADD');
        viewmodel.reset();
        viewmodel.get('operationState').should.equal('NO_OPERATION');
      });
    });
  });
});

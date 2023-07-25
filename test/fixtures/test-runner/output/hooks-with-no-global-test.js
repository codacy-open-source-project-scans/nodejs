'use strict';
const { test, describe, it, before, after, beforeEach, afterEach } = require('node:test');
const assert = require("assert");

// This file should not have any global tests to reproduce bug #48844
const testArr = [];

before(() => testArr.push('global before'));
after(() => {
  testArr.push('global after');

  try {
    assert.deepStrictEqual(testArr, [
      'global before',
      'describe before',

      'describe beforeEach',
      'describe it 1',
      'describe afterEach',

      'describe beforeEach',
      'describe test 2',
      'describe afterEach',

      'describe nested before',

      'describe beforeEach',
      'describe nested beforeEach',
      'describe nested it 1',
      'describe afterEach',
      'describe nested afterEach',

      'describe beforeEach',
      'describe nested beforeEach',
      'describe nested test 2',
      'describe afterEach',
      'describe nested afterEach',

      'describe nested after',
      'describe after',
      'global after',
    ]);
  } catch (e) {
    // TODO(rluvaton): remove the try catch after #48867 is fixed
    console.error(e);
    process.exit(1);
  }
});

describe('describe hooks with no global tests', () => {
  before(() => {
    testArr.push('describe before');
  });
  after(()=> {
    testArr.push('describe after');
  });
  beforeEach(() => {
    testArr.push('describe beforeEach');
  });
  afterEach(() => {
    testArr.push('describe afterEach');
  });

  it('1', () => testArr.push('describe it 1'));
  test('2', () => testArr.push('describe test 2'));

  describe('nested', () => {
    before(() => {
      testArr.push('describe nested before')
    });
    after(() => {
      testArr.push('describe nested after')
    });
    beforeEach(() => {
      testArr.push('describe nested beforeEach')
    });
    afterEach(() => {
      testArr.push('describe nested afterEach')
    });

    it('nested 1', () => testArr.push('describe nested it 1'));
    test('nested 2', () => testArr.push('describe nested test 2'));
  });
});

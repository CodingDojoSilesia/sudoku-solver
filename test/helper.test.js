'use strict';

const chai = require('chai');
require('mocha');
const helper = require('../src/helper');

describe('Create 2d array', () => {
    it('Should return array', () => chai.assert.isArray(helper.create2DArray()));
    it('Should return array contains provided number of elements', () => {
        chai.assert.equal(helper.create2DArray(5).length, 5);
    });
});

describe('Block extraction', () => {
    const n = null;
    const sudokuArray = [
        [n, n, n, 2, 6, n, 7, n, 1],
        [6, 8, n, n, 7, n, n, 9, n],
        [1, 9, n, n, n, 4, 5, n, n],
        [8, 2, n, 1, n, n, n, 4, n],
        [n, n, 4, 6, n, 2, 9, n, n],
        [n, 5, n, n, n, 3, n, 2, 8],
        [n, n, 9, 3, n, n, n, 7, 4],
        [n, 4, n, n, 5, n, n, 3, 6],
        [7, n, 3, n, 1, 8, n, n, n]
    ];
    const blocks = {
        '0/2': [n, n, n, 6, 8, n, 1, 9, n],
        '3/5': [1, n, n, 6, n, 2, n, n, 3],
        '7/8': [n, 7, 4, n, 3, 6, n, n, n]
    }

    it('Should return 9 elements array', () => {
        chai.assert.isArray(helper.extractBlock(1, 2, sudokuArray));
        chai.assert.equal(helper.extractBlock(1, 2, sudokuArray).length, 9);
    });
    it('Should return array of all elements in block', () => {
        chai.assert.deepEqual(helper.extractBlock(1, 2, sudokuArray), blocks['0/2']);
        chai.assert.deepEqual(helper.extractBlock(4, 5, sudokuArray), blocks['3/5']);
        chai.assert.deepEqual(helper.extractBlock(7, 8, sudokuArray), blocks['7/8']);
    })
    it('Should throw RangeError if provided coords are out of array range', () => {
        chai.expect(() => helper.extractBlock(-1, -1, sudokuArray)).to.throw(RangeError);
        chai.expect(() => helper.extractBlock(9, 5, sudokuArray)).to.throw(RangeError);
    })
});

describe('Column extraction', () => {
    const n = null;
    const sudokuArray = [
        [n, n, n, 2, 6, n, 7, n, 1],
        [6, 8, n, n, 7, n, n, 9, n],
        [1, 9, n, n, n, 4, 5, n, n],
        [8, 2, n, 1, n, n, n, 4, n],
        [n, n, 4, 6, n, 2, 9, n, n],
        [n, 5, n, n, n, 3, n, 2, 8],
        [n, n, 9, 3, n, n, n, 7, 4],
        [n, 4, n, n, 5, n, n, 3, 6],
        [7, n, 3, n, 1, 8, n, n, n]
    ];

    const columns = {
        0: [n, 6, 1, 8, n, n, n, n, 7],
        4: [6, 7, n, n, n, n, n, 5, 1],
        8: [1, n, n, n, n, 8, 4, 6, n]
    };
    it('Should return 9 elements array', () => {
        chai.assert.isArray(helper.extractColumn(0, sudokuArray));
        chai.assert.equal(helper.extractColumn(0, sudokuArray).length, 9);
    });
    it('Should return array of all elements in Column', () => {
        chai.assert.deepEqual(helper.extractColumn(0, sudokuArray), columns[0]);
        chai.assert.deepEqual(helper.extractColumn(4, sudokuArray), columns[4]);
        chai.assert.deepEqual(helper.extractColumn(8, sudokuArray), columns[8]);
    })
    it('Should throw RangeError if provided coords are out of array range', () => {
        chai.expect(() => helper.extractColumn(-1, sudokuArray)).to.throw(RangeError);
        chai.expect(() => helper.extractColumn(9, sudokuArray)).to.throw(RangeError);
    })
});



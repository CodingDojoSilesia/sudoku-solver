'use strict';

const chai = require('chai');
require('mocha');
const helper = require('../src/helper');

describe('Create matrix', () => {
    it('Should return array', () => chai.assert.isArray(helper.createMatrix()));
    it('Should return array contains provided number of elements', () => {
        chai.assert.equal(helper.createMatrix(5).length, 5);
    });
});

describe('Block extraction', () => {
    const n = null;
    const sudokuMatrix = [
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
        '0/0': [n, n, n, 6, 8, n, 1, 9, n],
        '0/2': [n, n, n, 6, 8, n, 1, 9, n],
        '3/5': [1, n, n, 6, n, 2, n, n, 3],
        '7/8': [n, 7, 4, n, 3, 6, n, n, n]
    }

    it('Should return 9 elements array', () => {
        chai.assert.isArray(helper.extractBlock(1, 2, sudokuMatrix));
        chai.assert.equal(helper.extractBlock(1, 2, sudokuMatrix).length, 9);
    });
    it('Should return array of all elements in block', () => {
        chai.assert.deepEqual(helper.extractBlock(0, 0, sudokuMatrix), blocks['0/0']);
        chai.assert.deepEqual(helper.extractBlock(0, 2, sudokuMatrix), blocks['0/2']);
        chai.assert.deepEqual(helper.extractBlock(4, 5, sudokuMatrix), blocks['3/5']);
        chai.assert.deepEqual(helper.extractBlock(7, 8, sudokuMatrix), blocks['7/8']);
    })
    it('Should throw RangeError if provided coords are out of matrix range', () => {
        chai.expect(() => helper.extractBlock(-1, -1, sudokuMatrix)).to.throw(RangeError);
        chai.expect(() => helper.extractBlock(9, 5, sudokuMatrix)).to.throw(RangeError);
    })
});

describe('Column extraction', () => {
    const n = null;
    const sudokuMatrix  = [
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
        chai.assert.isArray(helper.extractColumn(0, sudokuMatrix));
        chai.assert.equal(helper.extractColumn(0, sudokuMatrix).length, 9);
    });
    it('Should return array of all elements in Column', () => {
        chai.assert.deepEqual(helper.extractColumn(0, sudokuMatrix), columns[0]);
        chai.assert.deepEqual(helper.extractColumn(4, sudokuMatrix), columns[4]);
        chai.assert.deepEqual(helper.extractColumn(8, sudokuMatrix), columns[8]);
    })
    it('Should throw RangeError if provided coords are out of matrix range', () => {
        chai.expect(() => helper.extractColumn(-1, sudokuMatrix)).to.throw(RangeError);
        chai.expect(() => helper.extractColumn(9, sudokuMatrix)).to.throw(RangeError);
    })
});

describe('Finding nulls in matrix', () => {
    const n = null;
    const sudokuMatrix  = [
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

    it('Should return 35 elements array', () => {
        chai.assert.isArray(helper.getEmptyCells(sudokuMatrix));
        chai.assert.equal(helper.getEmptyCells(sudokuMatrix).length, 45);
    });
    it('Every element should contains row and col keys', () => {
        helper.getEmptyCells(sudokuMatrix).forEach(el => chai.expect(el).to.have.all.keys('row', 'col'));
    });
});

describe('Finding first integer within given range that does not exists in providen array', () => {
    it ('Should return first unique number within prividen range', () => {
        const arrWithUniques = [2, 3, 4, 8, 9.2 ,10];
        chai.assert.equal(helper.findUniqueInt(1, 11, arrWithUniques), 1, 'Testing min as ununique number');
        chai.assert.equal(helper.findUniqueInt(8, 11, arrWithUniques), 9, 'Function should ignore float numbers');
    });
    it ('Should return null if could not find any unique number', () => {
        const arrWithoutUniques = [1, 2, 3, 4, 5];
        chai.assert.equal(helper.findUniqueInt(1, 5, arrWithoutUniques), null)
    });
});



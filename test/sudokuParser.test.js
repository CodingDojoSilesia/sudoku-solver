"use strict";

const chai = require("chai");
require("mocha");
const parser = require("../src/sudokuParser");

describe("Sudoku string parser", () => {
    const n = null;
    const unparsedSudoku = "___26_7_168__7__9_19___45__82_1___4___46_29___5___3_28__93___74_4__5__367_3_18___";
    const parsed = [
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

    it("Should return 2d array from provided string", () => {
        chai.assert.deepEqual(parser.parseToArray(unparsedSudoku), parsed);
    });
});

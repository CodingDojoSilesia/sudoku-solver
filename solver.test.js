"use strict";

const chai = require("chai");
require("mocha");
const solver = require("./solver");

describe("Sudoku one", function () {
    it("should be solved", function () {
        var unsolved_sudoku = "___26_7_168__7__9_19___45__82_1___4___46_29___5___3_28__93___74_4__5__367_3_18___";
        var solved = "435269781682571493197834562826195347374682915951743628519326874248957136763418259";
        chai.assert.equal(solver.solve(unsolved_sudoku), solved);
    });
});
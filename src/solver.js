"use strict";

const parser = require("./sudokuParser");
const helper = require("./helper");

function getRelatedCells(cell, sudokuMatrix) {
    return new Array()
        .concat(helper.extractRow(cell.row, sudokuMatrix))
        .concat(helper.extractColumn(cell.col, sudokuMatrix))
        .concat(helper.extractBlock(cell.row, cell.col, sudokuMatrix, 3));
}

function solve(sudokuString) {
    let sudokuMatrix = parser.parseToArray(sudokuString);
    const modifiableCells = helper.getEmptyCells(sudokuMatrix);
    let nowModified = 0;

    while (helper.inRange(0, modifiableCells.length - 1, nowModified)) {
        let x = modifiableCells[nowModified].row;
        let y = modifiableCells[nowModified].col;
        if (sudokuMatrix[x][y] == null) sudokuMatrix[x][y] = 0;
        let newUnique = helper.findUniqueInt(
            sudokuMatrix[x][y],
            9,
            getRelatedCells(modifiableCells[nowModified], sudokuMatrix)
        );

        if (newUnique == null) {
            sudokuMatrix[x][y] = null;
            nowModified--;
        } else {
            sudokuMatrix[x][y] = newUnique;
            nowModified++;
        }
    }
    if (nowModified < 0) return "Unsolvable sudoku";
    else return sudokuMatrix.join().replace(/,/g, "");
}
exports.solve = solve;

"use strict";

const helper = require("./helper");

function parseToArray(sudokuAsString) {
    let sudokuArray = helper.createMatrix(9);
    sudokuAsString.split("").forEach((el, index) => {
        sudokuArray[Math.floor(index / 9)][index % 9] = el != "_" ? parseInt(el) : null;
    });
    return sudokuArray;
}



module.exports = {
    parseToArray
};

function inRange(low, high, num) {
    return num >= low && num <= high ? true : false;
}

function createMatrix(rows) {
    return Array.from(Array(rows), row => []);
}

function extractBlock(x, y, matrix, blockSize = 3) {
    if (!inRange(0, matrix.length - 1, x) || y < 0) throw new RangeError();
    const blockStart = { row: x - (x % blockSize), column: y - (y % blockSize) };
    let block = [];
    for (let i = blockStart.row; i < blockStart.row + blockSize; i++) {
        if (y >= matrix[i].length) throw new RangeError();
        for (let j = blockStart.column; j < blockStart.column + blockSize; j++) {
            block.push(matrix[i][j]);
        }
    }
    return block;
}

function extractRow(rowIndex, matrix) {
    let row = [];
    if (!inRange(0, matrix.length - 1, rowIndex)) throw new RangeError();
    for (let i = 0; i < matrix.length; i++) {
        row.push(matrix[rowIndex][i]);
    }
    return row;
}

function extractColumn(columnIndex, matrix) {
    let column = [];
    if (!inRange(0, matrix.length - 1, columnIndex)) throw new RangeError();
    for (let i = 0; i < matrix.length; i++) {
        column.push(matrix[i][columnIndex]);
    }
    return column;
}

function getEmptyCells(matrix) {
    let emptyCells = [];
    matrix.forEach((arr, rowIndex) => {
        arr.forEach((value, colIndex) => {
            if (value === null) emptyCells.push({row: rowIndex, col: colIndex});
        });
    });
    return emptyCells;
}


function findUniqueInt(min, max, array){
    const values = new Set(array);
    for (let i = min; i <= max; i++){
        if (!values.has(i)){
            return i;
        }
    } 
    return null;
}
module.exports = {
    createMatrix,
    inRange,
    extractBlock,
    extractRow,
    extractColumn,
    getEmptyCells,
    findUniqueInt
};

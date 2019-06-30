function create2DArray(rows) {
    return Array.from(Array(rows), row => []);
}

function inRange(low, high, num) {
    return num >= low && num <= high ? true : false;
}

function extractBlock(x, y, array, blockSize = 3) {
    if (!inRange(1, array.length - 1, x) || y < 0)
        throw new RangeError();
    const blockStart = { row: x - (x % blockSize), column: y - (y % blockSize) };
    let block = [];
    for (let i = blockStart.row; i < blockStart.row + blockSize; i++){
        if(y >= array[i].length)
            throw new RangeError();
        for (let j = blockStart.column; j < blockStart.column + blockSize; j++){
            block.push(array[i][j]);
        }
    }
    return block;
}

function extractColumn(columnIndex, array){
    if (!inRange(0, array.length - 1, columnIndex))
        throw new RangeError();
    let column = [];
    for (let i = 0; i < array.length; i++){
        column.push(array[i][columnIndex]);
    }
    return column;
}

module.exports = {
    create2DArray,
    inRange,
    extractBlock,
    extractColumn,
};

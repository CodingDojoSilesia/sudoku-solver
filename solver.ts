interface position { row: number; column: number; };
interface placement { row: number; column: number; number: number; };
type puzzle = number[][];

const UNASSIGNED = 0;

export function solve(sudokuAsString: string): string {
    const puzzle = sudokuStringToPuzzle(sudokuAsString);
    const stack: position[] = [];
    let position = findUnassignedPosition(puzzle);
    while (true) {
        // placing a digit
        puzzle[position.row][position.column]++;
        // all options were checked, so back to the previous position
        if (puzzle[position.row][position.column] === 10) {
            // making the cell blank
            puzzle[position.row][position.column] = UNASSIGNED; 
            position = stack.pop(); // the previous position
            continue;
        }
        // if constraints are violated then the number should be increased
        if (isViolatedAfterLastPlacement(
            puzzle,
            { row: position.row, column: position.column, number: puzzle[position.row][position.column] }
        )) {
            continue;
        }
        // the number seems OK so far, then go to the next position
        stack.push(position); // put the current position on the stack
        position = findUnassignedPosition(puzzle);
        // there is not valid position, hence the puzzle is solved
        if (position === null) {
            break;
        }
    }
    return puzzleToSudokuString(puzzle);
}

export function sudokuStringToPuzzle(sudokuAsString: string): puzzle {
    return sudokuAsString.match(/.{9}/g)
        .map(row => row.split('').map(cell => cell === "_" ? UNASSIGNED : parseInt(cell)));
}

export function puzzleToSudokuString(puzzle: puzzle): string {
    return puzzle.map(row => row.map(cell => cell === UNASSIGNED ? "_" : cell).join("")).join("");
}

export function isViolatedAfterLastPlacement(puzzle: puzzle, placement: placement): boolean {
    // validating row
    for (let column = 0; column < puzzle[placement.row].length; column++) {
        if (column !== placement.column && puzzle[placement.row][column] === placement.number) {
            return true;
        }
    }
    // validating column
    for (let row = 0; row < puzzle.length; row++) {
        if (row !== placement.row && puzzle[row][placement.column] === placement.number) {
            return true;
        }
    }
    // validating box
    const boxStartRow: number = placement.row - placement.row % 3;
    const boxStartColumn: number = placement.column - placement.column % 3;
    for (let rowShift = 0; rowShift < 3; rowShift++) {
        for (let columnShift = 0; columnShift < 3; columnShift++) {
            if (
                (boxStartRow + rowShift !== placement.row || boxStartColumn + columnShift !== placement.column)
                && puzzle[boxStartRow + rowShift][boxStartColumn + columnShift] === placement.number
            ) {
                return true;
            }
        }
    }
    // no violations
    return false;
}

export function findUnassignedPosition(puzzle: puzzle): position | null {
    for (let row = 0; row < puzzle.length; row++) {
        for (let column = 0; column < puzzle[row].length; column++) {
            if (puzzle[row][column] === UNASSIGNED) {
                return { row: row, column: column };
            }
        }
    }
    return null;
}

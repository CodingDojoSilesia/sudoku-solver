import { assert } from "chai";
import "mocha";
import { solve, sudokuStringToPuzzle, puzzleToSudokuString, isViolatedAfterLastPlacement, findUnassignedPosition }
    from "./solver";

describe("Sudoku one", () => {
    const unsolvedSudoku = "___26_7_168__7__9_19___45__82_1___4___46_29___5___3_28__93___74_4__5__367_3_18___";
    it("should be solved", () => {
        const solved = "435269781682571493197834562826195347374682915951743628519326874248957136763418259";
        assert.equal(solve(unsolvedSudoku), solved);
    })
    it("should be convertible to an array", () => {
        const sudokuArray = [
            [0,0,0,2,6,0,7,0,1],
            [6,8,0,0,7,0,0,9,0],
            [1,9,0,0,0,4,5,0,0],
            [8,2,0,1,0,0,0,4,0],
            [0,0,4,6,0,2,9,0,0],
            [0,5,0,0,0,3,0,2,8],
            [0,0,9,3,0,0,0,7,4],
            [0,4,0,0,5,0,0,3,6],
            [7,0,3,0,1,8,0,0,0]
        ];
        assert.deepEqual(sudokuStringToPuzzle(unsolvedSudoku), sudokuArray);
    })
    it("should be convertible to a sudoku string", () => {
        const puzzle = [
            [0,0,0,2,6,0,7,0,1],
            [6,8,0,0,7,0,0,9,0],
            [1,9,0,0,0,4,5,0,0],
            [8,2,0,1,0,0,0,4,0],
            [0,0,4,6,0,2,9,0,0],
            [0,5,0,0,0,3,0,2,8],
            [0,0,9,3,0,0,0,7,4],
            [0,4,0,0,5,0,0,3,6],
            [7,0,3,0,1,8,0,0,0]
        ];
        assert.deepEqual(puzzleToSudokuString(puzzle), unsolvedSudoku);
    })
    it("should be violated after placement of 2 in the first row", () => {
        const puzzle = sudokuStringToPuzzle(unsolvedSudoku);
        const placement = { row: 0, column: 0, number: 2 }
        assert.isTrue(isViolatedAfterLastPlacement(puzzle, placement));
    });
    it("should not be violated after placement of 4 in the first row", () => {
        const puzzle = sudokuStringToPuzzle(unsolvedSudoku);
        const placement = { row: 0, column: 0, number: 4 }
        assert.isFalse(isViolatedAfterLastPlacement(puzzle, placement));
    });
    it("should be violated after placement of 7 in the first column", () => {
        const puzzle = sudokuStringToPuzzle(unsolvedSudoku);
        const placement = { row: 0, column: 0, number: 7 }
        assert.isTrue(isViolatedAfterLastPlacement(puzzle, placement));
    });
    it("should not be violated after placement of 3 in the first column", () => {
        const puzzle = sudokuStringToPuzzle(unsolvedSudoku);
        const placement = { row: 0, column: 0, number: 3 }
        assert.isFalse(isViolatedAfterLastPlacement(puzzle, placement));
    });
    it("should be violated after placement of 9 in the first box", () => {
        const puzzle = sudokuStringToPuzzle(unsolvedSudoku);
        const placement = { row: 0, column: 0, number: 9 }
        assert.isTrue(isViolatedAfterLastPlacement(puzzle, placement));
    });
    it("should be violated after placement of 5 in the first box", () => {
        const puzzle = sudokuStringToPuzzle(unsolvedSudoku);
        const placement = { row: 0, column: 0, number: 5 }
        assert.isFalse(isViolatedAfterLastPlacement(puzzle, placement));
    });
    it("should have an unassigned position", () => {
        const puzzle = sudokuStringToPuzzle(unsolvedSudoku);
        assert.notEqual(findUnassignedPosition(puzzle), null);
    });
    it("should not have an unassigned position", () => {
        const puzzle = sudokuStringToPuzzle(
            "435269781682571493197834562826195347374682915951743628519326874248957136763418259"
        );
        assert.equal(findUnassignedPosition(puzzle), null);
    });
})

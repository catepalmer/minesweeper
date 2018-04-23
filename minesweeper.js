document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
/* var board = {

cells:[
{row: 0, col: 0, isMine: "", isMarked: "", hidden: true},
{row: 0, col: 1, isMine: "", isMarked: "", hidden: true},
{row: 0, col: 2, isMine: "", isMarked: "", hidden: true},
{row: 1, col: 0, isMine: "", isMarked: "", hidden: true},
{row: 1, col: 1, isMine: "", isMarked: "", hidden: true},
{row: 1, col: 2, isMine: "", isMarked: "", hidden: true},
{row: 2, col: 0, isMine: "", isMarked: "", hidden: true},
{row: 2, col: 1, isMine: "", isMarked: "", hidden: true},
{row: 2, col: 2, isMine: "", isMarked: "", hidden: true}
]
}
*/

var board;
var gridSize = 6;

function makeBoard () {
  board = {
    cells:[]
  }
  for (var x = 0; x < gridSize; x++) {
    for (var y = 0; y < gridSize; y ++) {
      board.cells.push ({
        row: x,
        col: y,
        isMine: Math.floor(Math.random()*1.3),
        isMarked: false,
        hidden: true
      })
    }
  }
}

function startGame () {

// Don't remove this function call: it makes the game work!

// - In startGame, above lib.initBoard(), write a for loop.
// This should loop through the contents of board.cells.
// (Remember, board.cells is an array of objects.)
// The loop's only job should be to call countSurroundingMines
// once for each cell in board.cells. You'll need to pass each
// cell as an argument(the bit in the parentheses).
// Assign the result of countSurroundingMines to a property on each cell
// object. The new property should be called surroundingMines.

document.addEventListener('click', checkForWin);
document.addEventListener('contextmenu', checkForWin);


for (var i = 0; i < board.cells.length; i++) {
board.cells[i].surroundingMines = countSurroundingMines (board.cells[i]);
}
lib.initBoard();

}


// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

// You can use this function call to declare a winner (once you've
// detected that they've won, that is!)
// lib.displayMessage('You win!')

for (i = 0; i < board.cells.length; i++) {
    var check = board.cells[i];
    if (check.isMine && !check.isMarked){
      return;
    } else if (!check.isMine && check.hidden) {
      return;
    }
  }
  lib.displayMessage('You win!');
  winSound();

}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
// var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {

// Further down in the file you'll see the function countSurroundingMines.
// Your job is to define it so it returns the number of cells around the current
// cell that have the isMine property set to true.

// Getting the cells that surround the current cell is pretty tricky, so we've
// provided a helper function: lib.getSurroundingCells. Read the comments above
// countSurroundingMines for more clues.
// To be clear, you don't need to writelib.getSurroundingCells... you can just start
// using it!
// You'll need to use a syntax that looks something like:
// var surroundingCells = getSurroundingCells(row, col);
// Think about how to get row and col out of your cell object: remember dot and
// bracket notation?
// You're going to have to loop through the surrounding cells returned from
// getSurroundingCells, checking each one to see if it's a mine and adding to a
// count variable if it is.
// Once you have the correct count, return it (return count).
// Once you've got the counts working to your satisfaction, commit your code!

var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
var count = 0;
for (i = 0; i < surroundingCells.length; i++) {

if (surroundingCells[i].isMine == true) {

count++;
}
}
return count;

// Further down in the file you'll see the function countSurroundingMines.
// Your job is to define it so it returns the number of cells around the
// current cell that have the isMine property set to true.


}


//Reset board function

function resetBoard () {
    removeListeners ();
    restart ();
  }
  
  function restart () {
    var board = document.getElementsByClassName('board')[0];
    board.innerHTML = '';
  }
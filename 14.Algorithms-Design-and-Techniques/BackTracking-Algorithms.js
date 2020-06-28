// BACKTRACKING ALGORITHMS

// 1. Rat in a Maze
// function ratInMaze(maze) {
//   //
//   // reset the Maze having all coordinates is 0
//   const solution = [];
//   for (let i = 0; i < maze.length; i++) {
//     solution[i] = [];
//     for (let j = 0; j < maze[i].length; j++) {
//       solution[i][j] = 0;
//     }
//   }

//   // find the Path is true
//   if (findPath(maze, 0, 0, solution) === true) {
//     return solution;
//   }
//   return "NO PATH FOUND";
// }

// function findPath(maze, x, y, solution) {
//   const n = maze.length;

//   if (x === n - 1 && y === n - 1) {
//     solution[x][y] = 1;
//     return true;
//   }

//   if (isSafe(maze, x, y) === true) {
//     solution[x][y] = 1;
//     if (findPath(maze, x + 1, y, solution)) {
//       return true;
//     }
//     if (findPath(maze, x, y + 1, solution)) {
//       return true;
//     }
//     solution[x][y] = 0;
//     // return false;
//   }
//   return false;
// }

// function isSafe(maze, x, y) {
//   const n = maze.length;
//   if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0) {
//     return true;
//   }
//   return false;
// }

// const maze = [
//   [1, 0, 0, 0],
//   [1, 1, 1, 1],
//   [0, 0, 1, 0],
//   [0, 1, 1, 1],
// ];
// console.log(ratInMaze(maze));

//

// 2. Sudoku Solver
// Sudoku is a very fun puzzle game and one of the most popular games of all time. The objective is to fill a 9x9 matrix with the digits 1 to 9 in order that each row and each column is composed with all the nine digits. The matrix also contains smaller boxes (3x3 matrix) that also need to contain all the nine digits.

// examine to see whether this 'matrix' satisfies Sudoku game or not
function sudokuSolver(matrix) {
  if (solveSudoku(matrix) === true) {
    return matrix;
  }
  return "NO SOLUTION EXISTS!";
}

const UNASSIGNED = 0;

function solveSudoku(matrix) {
  let row = 0;
  let col = 0;
  let checkBlankSpaces = false;

  // To check if this matrix have any value equal to 0 or blank spaces
  for (row = 0; row < matrix.length; row++) {
    for (col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === UNASSIGNED) {
        checkBlankSpaces = true; // there are blank spaces
        break;
      }
    }

    // if there are blank spaces, we will break out the two loops
    if (checkBlankSpaces === true) {
      break;
    }
  }

  // if blank spaces are filled out, return true or the puzzle is finish
  if (checkBlankSpaces === false) {
    return true;
  }

  //
  for (let num = 1; num <= 9; num++) {
    //
    if (isSafe(matrix, row, col, num)) {
      matrix[row][col] = num;
      if (solveSudoku(matrix)) {
        return true;
      }
      matrix[row][col] = UNASSIGNED;
    }
  }
  return false;
}

function isSafe(matrix, row, col, num) {
  return (
    !usedInRow(matrix, row, num) &&
    !usedInCol(matrix, col, num) &&
    !usedInBox(matrix, row - (row % 3), col - (col % 3), num)
  );
}

// chạy từ row = 0 để kiểm tra từ col 0-8 xem có giá trị == num không
function usedInRow(matrix, row, num) {
  for (let col = 0; col < matrix.length; col++) {
    if (matrix[row][col] === num) {
      return true;
    }
  }
  return false;
}

// chạy từ col = 0 để kiểm tra từ row 0-8 xem có giá trị == num không
function usedInCol(matrix, col, num) {
  for (let row = 0; row < matrix.length; row++) {
    if (matrix[row][col] === num) {
      return true;
    }
  }
  return false;
}

// kiểm tra trong ô với tọa độ row, col +3 xem có num xuất hiện chưa
function usedInBox(matrix, boxStartRow, boxStartCol, num) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (matrix[row + boxStartRow][col + boxStartCol] === num) {
        return true;
      }
    }
  }
  return false;
}

const sudokuGrid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];
console.log(sudokuSolver(sudokuGrid));

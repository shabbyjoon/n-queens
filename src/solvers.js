/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  for (let rowIndex = 0; rowIndex < n; rowIndex++) {
    for (let colIndex = 0; colIndex < n; colIndex++) {
      board.togglePiece(rowIndex, colIndex);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(rowIndex, colIndex);
      }
    }
  }
  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var colIndices = [];
  for (let i = 0; i < n; i++) {
    colIndices.push(i);
  }
  var totalPerms = function(colIndices, perms = 0) {
    if (perms === n) {
      solutionCount++;
      return;
    }

    for (let i = 0; i < colIndices.length; i++) {
      perms++;
      var newIndices = colIndices.slice(0, i).concat(colIndices.slice(i + 1));
      totalPerms(newIndices, perms);
      perms--;
    }
  };
  totalPerms(colIndices);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();
  var queenCounter = 0;

  var findSolution = function(row) {
    if (queenCounter === n) {
      solution = board.rows();
      return true;
    }
    for (let col = 0; col < n; col++) {
      board.togglePiece(row, col);
      queenCounter++;
      if (!board.hasAnyQueenConflictsOn(row, col)) {
        if (findSolution(row + 1)) {
          return true;
        }
      }
      board.togglePiece(row, col);
      queenCounter--;
    }
  };
  findSolution(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;
  var queenCounter = 0;

  var findSolutions = function(row) {
    if (queenCounter === n) {
      solutionCount++;
      return;
    }
    for (let col = 0; col < n; col++) {
      board.togglePiece(row, col);
      queenCounter++;
      if (!board.hasAnyQueenConflictsOn(row, col)) {
        findSolutions(row + 1);
      }
      board.togglePiece(row, col);
      queenCounter--;
    }
  };
  findSolutions(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

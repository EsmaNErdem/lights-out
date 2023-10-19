import React from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5 , ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = React.useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      const col = Array.from({length: ncols}, () =>  Math.random() < chanceLightStartsOn);
      initialBoard.push(col);
    }
    return initialBoard;
  }

  function hasWon() {
    return board.every(r => r.every(c => c == false))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const copyBoard = board.map(row => [...row])

      flipCell(y, x, copyBoard)
      flipCell(y+1, x, copyBoard)
      flipCell(y-1, x, copyBoard)
      flipCell(y, x+1, copyBoard)
      flipCell(y, x-1, copyBoard)

      return copyBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if( hasWon() ) {
    return (
      <h1>You won the game!</h1>
    )
  }   

  return (
    <table className="Board">
      <tbody>
        {board.map((r, yCoord ) => ( 
          <tr key={yCoord}>
            {r.map((c, xCoord) => (
              <Cell
                key={`${yCoord}-${xCoord}`} 
                isLit={c}
                coord={`${yCoord}-${xCoord}`}
                flipCellsAroundMe={flipCellsAround}
              />
            ))} 
            {/* {} needed within tr tag */}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Board;

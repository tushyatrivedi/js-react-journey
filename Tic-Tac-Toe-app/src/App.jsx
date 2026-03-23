import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {" "}
      {value}
    </button>
  );
}

export default function Game() {
  //The Game component controls the state now down to the Board and Square component
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentmove] = useState(0);

  //only display moves till currentMove
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    //each time a moveis made, only get history till that move
    let newHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setCurrentmove(newHistory.length - 1);
    setHistory(newHistory);
    setXIsNext(!xIsNext);
  }

  //this function will take the move ie index of the history array
  //and only return arrays from history till that index
  function jumpTo(nextMove) {
    setCurrentmove(nextMove);
    setXIsNext(xIsNext % 2 == 0);
  }

  let moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to move: ${move}`;
    } else {
      description = `Go to the beginning`;
    }
    return (
      <li key={`${move} x`}>
        <button
          type="button"
          onClick={() => {
            jumpTo(move);
          }}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <ol className="game-info">{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    //if the square already has a value or there is a winner return early
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    let nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  //display status of the game, check if there is any winner
  let status;
  let winner = calculateWinner(squares);
  if (winner) {
    status = `${winner} player won the game`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

//function takes as a input an array of 9 squares,
//inside checks each line possible in the game with the corresponding square values
//it checks each line and finds the winner X or O or none and returns it
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

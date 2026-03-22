import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {" "}
      {value}
    </button>
  );
}

export default function Board() {
  //Board component needs to remember value in each sqaure, so let parent component
  //contain the state
  const [squares, setSquares] = useState(Array(9).fill(null));
  //track the next move, X or O
  const [xIsNext, setXIsNext] = useState(true);

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
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
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

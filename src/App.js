import { useState } from "react";
import Grid from "./Grid";
import Block from "./Block";
import "./App.css";

const SIZE = 10;

const BLOCKS = [
  [[1]],
  [[1, 1]],
  [[1], [1]],
  [[1, 1], [1, 1]],
  [[1, 1, 1]],
  [[1], [1], [1]],
  [[1, 0], [1, 1]]
];

const emptyGrid = () =>
  Array(SIZE)
    .fill(0)
    .map(() => Array(SIZE).fill(0));

export default function App() {
  const [grid, setGrid] = useState(emptyGrid());
  const [block, setBlock] = useState(
    BLOCKS[Math.floor(Math.random() * BLOCKS.length)]
  );
  const [score, setScore] = useState(0);

  const placeBlock = (row, col) => {
    const newGrid = grid.map(r => [...r]);
    let gainedScore = 0;

    //  Check placement validity
    for (let r = 0; r < block.length; r++) {
      for (let c = 0; c < block[0].length; c++) {
        if (block[r][c]) {
          if (
            row + r >= SIZE ||
            col + c >= SIZE ||
            newGrid[row + r][col + c]
          ) {
            return;
          }
        }
      }
    }

    //  Place block
    for (let r = 0; r < block.length; r++) {
      for (let c = 0; c < block[0].length; c++) {
        if (block[r][c]) {
          newGrid[row + r][col + c] = 1;
        }
      }
    }

    //  Clear full rows (+10 each)
    for (let r = 0; r < SIZE; r++) {
      if (newGrid[r].every(cell => cell === 1)) {
        newGrid[r] = Array(SIZE).fill(0);
        gainedScore += 10;
      }
    }

    //  Clear full columns (+20 each)
    for (let c = 0; c < SIZE; c++) {
      let full = true;
      for (let r = 0; r < SIZE; r++) {
        if (newGrid[r][c] === 0) {
          full = false;
          break;
        }
      }

      if (full) {
        for (let r = 0; r < SIZE; r++) {
          newGrid[r][c] = 0;
        }
        gainedScore += 20;
      }
    }

    setGrid(newGrid);
    setScore(prev => prev + gainedScore);
    setBlock(BLOCKS[Math.floor(Math.random() * BLOCKS.length)]);
  };

  return (
    <div className="app">
      <div className="score">Score: {score}</div>
      <h1>Block Puzzle</h1>
      <Grid grid={grid} placeBlock={placeBlock} />
      <Block block={block} />
    </div>
  );
}

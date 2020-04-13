import React, { useReducer } from 'react';
import Board from './Board';
import Headers from './Headers';
import Validation from './Validation';
import * as Constants from './Constants';

const initialState = Constants.BOARD_CELLS.map(() => Constants.EMPTY);

const wrapperStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTtemplateRows: "repeat(3, 1fr)",
  gridGap: "3px",
  width: "100vw",
  height: "calc(100vh)",
  fontSize: "40px",
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'active':
      state[action.index] = Constants.HIT;
      return [...state];
    case 'inactive':
      state[action.index] = Constants.EMPTY;
      return [...state];
    case 'reset':
      return []
    default:
      throw new Error();
  }
}

const Game = () => {
  const [userSolution, dispatch] = useReducer(reducer, initialState);
  return (
    <div style={wrapperStyle}>
      <Validation userSolution={userSolution} />
      <Headers userSolution={userSolution} />
      <Board setHit={dispatch} numberOfRows={Constants.MATRIX.length} numberOfColumns={Constants.MATRIX[0].length} />
    </div>
  )
}

const App = () => <Game />;

export default App;
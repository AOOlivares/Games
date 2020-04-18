import React, { useReducer, useState } from 'react';
import Board from './Board';
import HeadersInformation from './HeadersInformation';
import Navigator from './Navigator';
import * as Constants from './Constants';

const initialState = Constants.BOARD_CELLS.map(() => ({ hited: false }));

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
    case Constants.CLICKTYPES.Hit:
      state[action.index] = { hitType: action.type, hited: true };
      return [...state];
    case Constants.CLICKTYPES.Cross:
      state[action.index] = { hitType: action.type, hited: true }
      return [...state];
    case Constants.CLICKTYPES.Unknown:
      state[action.index] = { hitType: action.type, hited: true }
      return [...state];
    case Constants.CLICKTYPES.Clear:
      state[action.index] = { hited: false }
      return [...state];
    default:
      throw new Error();
  }
}

const Game = () => {
  const [userSolution, dispatch] = useReducer(reducer, initialState);
  const [clickType, setClickType] = useState(Constants.CLICKTYPES.Hit);
  return (
    <div style={wrapperStyle}>
      <Navigator userSolution={userSolution} setClickType={setClickType} />
      <HeadersInformation userSolution={userSolution} />
      <Board userSolution={userSolution} clickType={clickType} setHit={dispatch} numberOfRows={Constants.MATRIX.length} numberOfColumns={Constants.MATRIX[0].length} />
    </div>
  )
}

const App = () => <Game />;

export default App;
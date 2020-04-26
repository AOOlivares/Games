import React from 'react';
import { useDispatch } from 'react-redux';
import Board from './Board';
import HeadersInformation from './HeadersInformation';
import Navigator from './Navigator';
import { newPuzzle } from '../features/gameSlice';

const wrapperStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTtemplateRows: "repeat(3, 1fr)",
  gridGap: "3px",
  width: "100vw",
  height: "calc(100vh)",
}

const Game = () => {
  return (
    <div style={wrapperStyle}>
      <Navigator />
      <HeadersInformation />
      <Board />
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch();
  dispatch(newPuzzle());
  return <Game />
};

export default App;
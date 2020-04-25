import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board from './Board';
import HeadersInformation from './HeadersInformation';
import Navigator from './Navigator';
import { selectMatrix, initiateGame } from './features/gameSlice';

const wrapperStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTtemplateRows: "repeat(3, 1fr)",
  gridGap: "3px",
  width: "100vw",
  height: "calc(100vh)",
  fontSize: "40px",
}

const Game = () => {
  const dispatch = useDispatch();
  const matrix = useSelector(selectMatrix);
  dispatch(initiateGame(matrix));

  return (
    <div style={wrapperStyle}>
      <Navigator />
      <HeadersInformation length={matrix[0].length} />
      <Board numberOfRows={matrix.length} numberOfColumns={matrix[0].length} />
    </div>
  )
}

const App = () => <Game />;

export default App;
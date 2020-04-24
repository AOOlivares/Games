import React, { useState } from 'react';
import Board from './Board';
import HeadersInformation from './HeadersInformation';
import Navigator from './Navigator';
import * as Constants from './Constants';

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
  const [clickType, setClickType] = useState(Constants.CLICKTYPES.Hit);
  return (
    <div style={wrapperStyle}>
      <Navigator setClickType={setClickType} />
      <HeadersInformation />
      <Board clickType={clickType} numberOfRows={Constants.MATRIX.length} numberOfColumns={Constants.MATRIX[0].length} />
    </div>
  )
}

const App = () => <Game />;

export default App;
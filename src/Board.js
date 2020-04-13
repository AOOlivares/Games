import React, { useState } from 'react';
import * as Constants from './Constants';

const styles = {
    board: {
        gridColumn: "2 / 4",
        gridRow: "2 / 4",
        boxSizing: "border-box",
    },
    boardGrid: {
        display: "grid",
        gridGap: "3px",
        height: "100%"
    },
    cell: {
        boxSizing: "border-box",
        height: "100%"
    },
    hitColors: {
        hit: '#75daad',
        empty: '#ffc299'
    }
}

const Cell = ({ setHit, index }) => {
    const [color, setColor] = useState(styles.hitColors.empty);
    function handleClick() {
        if (color === styles.hitColors.empty) {
            setHit({ type: 'active', index: index })
            setColor(styles.hitColors.hit);
        } else {
            setHit({ type: 'inactive', index: index })
            setColor(styles.hitColors.empty);
        }
    }

    return <div onClick={handleClick} style={{ ...styles.cell, backgroundColor: color }} />;
}

const BoardGrid = ({ numberOfRows, numberOfColumns, setHit }) =>
    <div style={{ ...styles.boardGrid, gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`, gridTemplateRows: `repeat(${numberOfRows}, 1fr)` }}>
        {Constants.BOARD_CELLS.map((cell, index) => <Cell setHit={setHit} index={index} key={index} />)}
    </div>

const Board = (props) => (
    <div style={styles.board}>
        <BoardGrid {...props} />
    </div>
)

export default Board;

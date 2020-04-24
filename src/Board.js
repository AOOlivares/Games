import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CLICKTYPES } from './Constants';
import { setHit, selectAnswer } from './features/answerSlice';
import { selectClickType } from './features/clickTypeSlice';

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
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'Helvetica',
        fontSize: '1em',
        fontWeight: 'bold',
    },
    hitColors: {
        hit: '#75daad',
        empty: '#ffc299'
    }
}

const Cell = ({ iX, iY, cell }) => {
    const clickType = useSelector(selectClickType);
    const dispatch = useDispatch();
    function handleClick() {
        const type = cell.hitType === clickType
            ? CLICKTYPES.Clear
            : clickType;

        dispatch(setHit({ type, iX, iY }));
    }

    return <div onClick={handleClick} style={{ ...styles.cell, backgroundColor: cell.color }} >{cell.value}</div>;
}

const BoardGrid = ({ numberOfRows, numberOfColumns }) => {
    const userSolution = useSelector(selectAnswer);
    return (
        <div style={{ ...styles.boardGrid, gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`, gridTemplateRows: `repeat(${numberOfRows}, 1fr)` }}>
            {userSolution.map((subArray, iX) => subArray.map((cell, iY) => <Cell cell={cell} iX={iX} iY={iY} key={`${iX}${iY}`} />))}
        </div>
    )
}

const Board = (props) =>
    <div style={styles.board}>
        <BoardGrid {...props} />
    </div>


export default Board;

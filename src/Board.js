import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Constants from './Constants';
import { setHit, selectUserSolution } from './features/userSolutionSlice';

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

const initialState = { color: styles.hitColors.empty, value: '' };

const reducer = (state, action) => {
    switch (action.type) {
        case Constants.CLICKTYPES.Hit:
            return { value: '', color: styles.hitColors.hit }
        case Constants.CLICKTYPES.Cross:
            return { value: Constants.CLICKTYPES.Cross, color: styles.hitColors.hit }
        case Constants.CLICKTYPES.Unknown:
            return { value: Constants.CLICKTYPES.Unknown, color: styles.hitColors.hit }
        default:
            return { value: '', color: styles.hitColors.empty }
    }
}

const Cell = ({ index, clickType, cell }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const dispatchUserSoltuion = useDispatch();
    function handleClick() {
        const type = cell.hitType === clickType
            ? Constants.CLICKTYPES.Clear
            : clickType;

        dispatch({ type: type });
        dispatchUserSoltuion(setHit({ type: type, index: index }));
    }

    return <div onClick={handleClick} style={{ ...styles.cell, backgroundColor: state.color }} >{state.value}</div>;
}

const BoardGrid = ({ numberOfRows, numberOfColumns, clickType, userSolution }) =>
    <div style={{ ...styles.boardGrid, gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`, gridTemplateRows: `repeat(${numberOfRows}, 1fr)` }}>
        {userSolution.map((cell, index) => <Cell cell={cell} clickType={clickType} index={index} key={index} />)}
    </div>

const Board = (props) => {
    const userSolution = useSelector(selectUserSolution);

    return (
        <div style={styles.board}>
            <BoardGrid {...props} userSolution={userSolution} />
        </div>
    )
}

export default Board;

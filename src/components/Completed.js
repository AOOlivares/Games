import React from 'react';
import { useDispatch } from 'react-redux';
import { newPuzzle } from '../features/gameSlice';

const style = {
    validationStyle: {
        gridColumn: "1",
        gridRow: "1",
        boxSizing: "border-box",
        backgroundColor: '#ffd31d'
    },
    buttonWrapper: {
        boxSizing: "border-box",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
}

export default function Completed() {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(newPuzzle());
    }

    return (
        <div style={style.validationStyle} >
            <div style={style.buttonWrapper}  >
                <button onClick={onClick}>
                    New Game?
                </button>
            </div>
        </div>
    )
}
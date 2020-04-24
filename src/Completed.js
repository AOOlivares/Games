import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMatrix, hydrateGameInformation } from './features/gameSlice';

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
    const matrix = useSelector(selectMatrix);

    const onClick = () => {
        dispatch(hydrateGameInformation(matrix));
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
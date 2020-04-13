import React from 'react';
import * as Constants from './Constants';

const validationStyle = {
    gridColumn: "1",
    gridRow: "1",
    boxSizing: "border-box"
}

export default function Validation({ userSolution }) {
    const areTheSame = (solution, userSolution) => {
        const result = solution.map((x, i) => x === userSolution[i]);

        return result.every(r => r === true);
    }

    const isValid = areTheSame(Constants.BOARD_CELLS, userSolution);
    const color = isValid ? "#ffd31d" : "#aacfcf";
    return (
        <div style={{ ...validationStyle, backgroundColor: color }} />
    )
}
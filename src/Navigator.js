import React from 'react';
import { useSelector } from 'react-redux';
import Completed from './Completed';
import Menu from './Menu';
import * as Constants from './Constants';
import { selectUserSolution } from './features/userSolutionSlice';

export default function Navigator({ setClickType }) {
    const userSolution = useSelector(selectUserSolution);

    const areTheSame = (solution, userSolution) => {
        const result = solution.map((x, i) => {
            let userInput = Constants.EMPTY
            if (userSolution[i].hited) {
                if (userSolution[i].hitType === Constants.CLICKTYPES.Hit) {
                    userInput = Constants.HIT
                }
            }

            return x === userInput;
        });
        return result.every(r => r === true);
    }

    const isValid = areTheSame(Constants.BOARD_CELLS, userSolution);

    const child = isValid
        ? <Completed />
        : <Menu setClickType={setClickType} />
    return (
        <>
            {child}
        </>
    )
}
import React from 'react';
import { useSelector } from 'react-redux';
import Completed from './Completed';
import Menu from './Menu';
import * as Constants from './Constants';
import { selectAnswer } from './features/answerSlice';

export default function Navigator({ setClickType }) {
    const answer = useSelector(selectAnswer);

    const areTheSame = (solution, answer) => {
        const result = solution.map((x, i) => {
            let userInput = Constants.EMPTY
            if (answer[i].hited) {
                if (answer[i].hitType === Constants.CLICKTYPES.Hit) {
                    userInput = Constants.HIT
                }
            }

            return x === userInput;
        });
        return result.every(r => r === true);
    }

    const isValid = areTheSame(Constants.BOARD_CELLS, answer);

    const child = isValid
        ? <Completed />
        : <Menu setClickType={setClickType} />
    return (
        <>
            {child}
        </>
    )
}
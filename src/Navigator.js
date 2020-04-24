import React from 'react';
import { useSelector } from 'react-redux';
import Completed from './Completed';
import Menu from './Menu';
import { EMPTY, HIT, CLICKTYPES, MATRIX } from './Constants';
import { selectAnswer } from './features/answerSlice';

export default function Navigator({ setClickType }) {
    const answer = useSelector(selectAnswer);

    const areTheSame = (solution, answer) => {
        const result2 = solution.map((subArray, index) => subArray.map((value, subIndex) => {
            let userInput = EMPTY
            if (answer[index][subIndex].hited) {
                if (answer[index][subIndex].hitType === CLICKTYPES.Hit) {
                    userInput = HIT
                }
            }

            return value === userInput;
        }));
        return result2.every(subArray => subArray.every(r => r === true));
    }

    const isValid = areTheSame(MATRIX, answer);

    const child = isValid
        ? <Completed />
        : <Menu setClickType={setClickType} />
    return (
        <>
            {child}
        </>
    )
}
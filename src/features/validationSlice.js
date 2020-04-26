import { createSlice } from '@reduxjs/toolkit';
import { isUserSolutionPotentiallyValid } from '../utils/gameUtils';
import { EMPTY, HIT, CLICKTYPES } from '../utils/Constants';

const initialState = {
    rows: {},
    columns: {},
    completed: false
}

export const validationSlice = createSlice({
    name: 'validation',
    initialState: initialState,
    reducers: {
        resetValidation: state => initialState,
        setRowsValidation: (state, action) => {
            const { index, value } = action.payload;
            state.rows[index] = value;
        },
        setColumnsValidation: (state, action) => {
            const { index, value } = action.payload;
            state.columns[index] = value;
        },
        setPuzzleCompleted: (state, action) => {
            state.completed = action.payload
        }
    },
});

export const { setRowsValidation, setColumnsValidation, setPuzzleCompleted, resetValidation } = validationSlice.actions;

export const selectCompleted = state => state.validation.completed;
export const selectRowsValidation = state => state.validation.rows;
export const selectColumnValidation = state => state.validation.columns;

export default validationSlice.reducer;

export const validateRows = () => (dispatch, getState) => {
    const { possibilities } = getState().rows;
    const { game } = getState().game;
    game.forEach((row, index) => {
        const value = isUserSolutionPotentiallyValid(row, possibilities[index]);
        dispatch(setRowsValidation({ index, value }));
    });
}

export const validateColumns = () => (dispatch, getState) => {
    const { possibilities } = getState().columns;
    const { game } = getState().game;
    const verticalGame = verticalChunks(game, game[0].length)
    verticalGame.forEach((column, index) => {
        const value = isUserSolutionPotentiallyValid(column, possibilities[index]);
        dispatch(setColumnsValidation({ index, value }));
    });
}

export const validatePuzzle = () => (dispatch, getState) => {
    const { puzzle, game } = getState().game;

    dispatch(setPuzzleCompleted(areTheSame(puzzle, game)));
    dispatch(validateRows());
    dispatch(validateColumns());
}

const verticalChunks = (horizontalChunks, columns) => {
    const vChunks = [];
    for (let index = 0; index < columns; index++) {
        vChunks.push(horizontalChunks.map((v, i, array) => array[i][index]))
    }
    return vChunks;
}

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
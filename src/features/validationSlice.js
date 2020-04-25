import { createSlice } from '@reduxjs/toolkit';
import { isUserSolutionPotentiallyValid } from '../HeadersInformationUtils';
import { EMPTY, HIT, CLICKTYPES } from '../Constants';

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
    const { answer, possibilities } = getState().rows;
    answer.forEach((row, index) => {
        const value = isUserSolutionPotentiallyValid(row, possibilities[index]);
        dispatch(setRowsValidation({ index, value }))
    });
}

export const validateColumns = () => (dispatch, getState) => {
    const { answer, possibilities } = getState().columns;
    answer.forEach((column, index) => {
        const value = isUserSolutionPotentiallyValid(column, possibilities[index]);
        dispatch(setColumnsValidation({ index, value }))
    });
}

export const validatePuzzle = () => (dispatch, getState) => {
    const { answer } = getState().rows;
    const { matrix } = getState().game;

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

    dispatch(setPuzzleCompleted(areTheSame(matrix, answer)));
}
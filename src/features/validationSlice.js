import { createSlice } from '@reduxjs/toolkit';
import { isUserSolutionPotentiallyValid } from '../HeadersInformationUtils';
import { EMPTY, HIT, CLICKTYPES } from '../Constants';
export const validationSlice = createSlice({
    name: 'validation',
    initialState: {
        rows: {},
        columns: {},
        completed: false
    },
    reducers: {
        setValidationToInitialState: (state, action) => {
            state.rows = {};
            state.columns = {};
            state.completed = false;
        },
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

export const { setRowsValidation, setColumnsValidation, setPuzzleCompleted, setValidationToInitialState } = validationSlice.actions;

export const selectCompleted = state => state.validation.completed;
export const selectRowsValidation = state => state.validation.rows;
export const selectColumnValidation = state => state.validation.columns;

export default validationSlice.reducer;

export const validateRows = () => (dispatch, getState) => {
    const { rows } = getState().answer;
    const { rowPossibilities } = getState().game;
    rows.forEach((row, index) => {
        const value = isUserSolutionPotentiallyValid(row, rowPossibilities[index]);
        dispatch(setRowsValidation({ index, value }))
    });
}

export const validateColumns = () => (dispatch, getState) => {
    const { columns } = getState().answer;
    const { columnPossibilities } = getState().game;
    columns.forEach((column, index) => {
        const value = isUserSolutionPotentiallyValid(column, columnPossibilities[index]);
        dispatch(setColumnsValidation({ index, value }))
    });
}

export const validatePuzzle = () => (dispatch, getState) => {
    const { rows } = getState().answer;
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

    dispatch(setPuzzleCompleted(areTheSame(matrix, rows)));
}
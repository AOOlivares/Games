import { createSlice } from '@reduxjs/toolkit';
import { rowValuesReducer, calculateArrayPossibilities, parseInput } from '../utils/gameUtils';
import { setAutoCompleteRow } from './gameSlice';

export const rowsSlice = createSlice({
    name: 'rows',
    initialState: {
        values: [[]],
        possibilities: [[]],
    },
    reducers: {
        setRowsValues: (state, action) => {
            state.values = action.payload;
        },
        setRowsPossibilities: (state, action) => {
            state.possibilities = action.payload;
        }
    },
});

export const { setRowsValues, setRowsPossibilities } = rowsSlice.actions;

export const selectRowsValues = state => state.rows.values;
export const selectRowsAnswer = state => state.rows.answer;
export const selectRowsPossibilities = state => state.rows.possibilities;

export default rowsSlice.reducer;

export const setRows = (matrix) => dispatch => {
    const rowValues = rowValuesReducer(matrix);
    dispatch(setRowsValues(rowValues));
    const rowPossibilities = calculateArrayPossibilities(rowValues, matrix[0].length);
    dispatch(setRowsPossibilities(rowPossibilities));
    rowPossibilities.forEach((possibilities, index) => {
        if (possibilities.length === 1) {
            const parsedRow = parseInput(possibilities[0]);
            dispatch(setAutoCompleteRow({ row: parsedRow, index }))
        }
    });
}


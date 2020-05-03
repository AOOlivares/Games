import { createSlice } from '@reduxjs/toolkit';
import { columnValuesReducer, calculateArrayPossibilities, parseInput } from '../utils/gameUtils';
import { setAutoCompleteColumn } from './gameSlice';

export const columnsSlice = createSlice({
    name: 'columns',
    initialState: {
        values: [[]],
        possibilities: [[]]
    },
    reducers: {
        setColumnsValues: (state, action) => {
            state.values = action.payload;
        },
        setColumnsPossibilities: (state, action) => {
            state.possibilities = action.payload;
        },
    },
});

export const { setColumnsValues, setColumnsPossibilities } = columnsSlice.actions;

export const selectColumnValues = state => state.columns.values;
export const selectColumnsAnswer = state => state.columns.answer;
export const selectColumnPossibilities = state => state.columns.possibilities;

export default columnsSlice.reducer;

export const setColumns = (matrix) => dispatch => {
    const columnValues = columnValuesReducer(matrix);
    dispatch(setColumnsValues(columnValues));
    const columnPossibilities = calculateArrayPossibilities(columnValues, matrix.length);
    dispatch(setColumnsPossibilities(columnPossibilities));
    columnPossibilities.forEach((possibilities, index) => {
        if (possibilities.length === 1) {
            const parsedColumn = parseInput(possibilities[0]);
            dispatch(setAutoCompleteColumn({ column: parsedColumn, index }));
        }
    });
}


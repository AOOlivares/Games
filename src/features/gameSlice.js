import { createSlice } from '@reduxjs/toolkit';
import { HIT, EMPTY } from '../Constants';
import { rowValuesReducer, columnValuesReducer, calculateArrayPossibilities } from '../HeadersInformationUtils';
import { setAnswerToInitialState } from './answerSlice';

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        matrix: [
            [HIT, EMPTY, HIT],
            [HIT, EMPTY, EMPTY]
        ],
        rowValues: [[]],
        columnValues: [[]],
        rowPossibilities: [[]],
        columnPossibilities: [[]]
    },
    reducers: {
        setRowValues: (state, action) => {
            state.rowValues = action.payload;
        },
        setColumnValues: (state, action) => {
            state.columnValues = action.payload;
        },
        setRowsPossibilities: (state, action) => {
            state.rowPossibilities = action.payload;
        },
        setColumnsPossibilities: (state, action) => {
            state.columnPossibilities = action.payload;
        },
    },
});

export const { setRowValues, setColumnValues, setRowsPossibilities, setColumnsPossibilities } = gameSlice.actions;

export const selectMatrix = state => state.game.matrix;
export const selectRowValues = state => state.game.rowValues;
export const selectColumnValues = state => state.game.columnValues;
export const selectRowsPossibilities = state => state.game.rowPossibilities;
export const selectColumnPossibilities = state => state.game.columnPossibilities;

export default gameSlice.reducer;

export const hydrateGameInformation = (matrix) => dispatch => {
    const rowValues = rowValuesReducer(matrix);
    dispatch(setRowValues(rowValues));
    const rowPossibilities = calculateArrayPossibilities(rowValues, matrix[0].length);
    dispatch(setRowsPossibilities(rowPossibilities));
    const columnValues = columnValuesReducer(matrix);
    dispatch(setColumnValues(columnValues));
    const columnPossibilities = calculateArrayPossibilities(columnValues, matrix.length);
    dispatch(setColumnsPossibilities(columnPossibilities));
    dispatch(setAnswerToInitialState(matrix));
}


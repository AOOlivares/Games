import { createSlice } from '@reduxjs/toolkit';
import { HIT, EMPTY } from '../Constants';
import { resetValidation } from './validationSlice';
import { setRows } from './rowsSlice';
import { setColumns } from './columnsSlice';

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        matrix: [
            [HIT, EMPTY, HIT],
            [HIT, EMPTY, EMPTY]
        ],
    },
});

export const selectMatrix = state => state.game.matrix;

export default gameSlice.reducer;

export const initiateGame = (matrix) => dispatch => {
    dispatch(setRows(matrix));
    dispatch(setColumns(matrix));
    dispatch(resetValidation())
}


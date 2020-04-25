import { createSlice } from '@reduxjs/toolkit';
import { CLICKTYPES } from '../Constants';
import { setRowsAnswerHit } from './rowsSlice';
import { setColumnsAnswerHit } from './columnsSlice';
import { validateColumns, validateRows, validatePuzzle } from './validationSlice';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        clickType: CLICKTYPES.Hit
    },
    reducers: {
        setClickType: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { setClickType } = userSlice.actions;

export const selectUserClickType = state => state.user.clickType;

export default userSlice.reducer;

export const setUserHit = (payload) => dispatch => {
    dispatch(setRowsAnswerHit(payload));
    dispatch(setColumnsAnswerHit(payload));
    dispatch(validateRows());
    dispatch(validateColumns());
    dispatch(validatePuzzle());
}
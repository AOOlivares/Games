import { createSlice } from '@reduxjs/toolkit';
import { CLICKTYPES } from '../utils/Constants';
import { setGameHit } from './gameSlice';
import { validatePuzzle } from './validationSlice';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        clickType: CLICKTYPES.Hit
    },
    reducers: {
        setClickType: (state, action) => {
            state.clickType = action.payload
        },
    },
});

export const { setClickType } = userSlice.actions;

export const selectUserClickType = state => state.user.clickType;

export default userSlice.reducer;

export const setUserHit = (payload) => dispatch => {
    dispatch(setGameHit(payload));
    dispatch(validatePuzzle());
}
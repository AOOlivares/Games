import { createSlice } from '@reduxjs/toolkit';
import { CLICKTYPES } from '../Constants';
export const validationSlice = createSlice({
    name: 'clickType',
    initialState: {
        value: CLICKTYPES.Hit
    },
    reducers: {
        setClickType: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { setClickType } = validationSlice.actions;

export const selectClickType = state => state.clickType.value;

export default validationSlice.reducer;


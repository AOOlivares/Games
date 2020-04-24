import { createSlice } from '@reduxjs/toolkit';
import { CLICKTYPES } from '../Constants';
export const clickTypeSlice = createSlice({
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

export const { setClickType } = clickTypeSlice.actions;

export const selectClickType = state => state.clickType.value;

export default clickTypeSlice.reducer;


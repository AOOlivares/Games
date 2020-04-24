import { createSlice } from '@reduxjs/toolkit';
import { CLICKTYPES } from '../Constants';
import { isUserSolutionPotentiallyValid } from '../HeadersInformationUtils';
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

export const hydrateGameInformation = (userAnswer, possibleSolutions) => dispatch => {
    const areTheSameStyle = isUserSolutionPotentiallyValid(userAnswer, possibleSolutions);

}
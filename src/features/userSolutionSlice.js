import { createSlice } from '@reduxjs/toolkit';
import { CLICKTYPES, BOARD_CELLS } from '../Constants';
export const userSolutionSlice = createSlice({
    name: 'userSolution',
    initialState: {
        solution: BOARD_CELLS.map(() => ({ hited: false }))
    },
    reducers: {
        setHit: (state, action) => {
            switch (action.payload.type) {
                case CLICKTYPES.Hit:
                    state.solution[action.payload.index] = { hitType: action.payload.type, hited: true };
                    break;
                case CLICKTYPES.Cross:
                    state.solution[action.payload.index] = { hitType: action.payload.type, hited: true }
                    break;
                case CLICKTYPES.Unknown:
                    state.solution[action.payload.index] = { hitType: action.payload.type, hited: true }
                    break;
                case CLICKTYPES.Clear:
                    state.solution[action.payload.index] = { hited: false }
                    break;
                default:
                    break;
            }
        },
    },
});

export const { setHit } = userSolutionSlice.actions;

export const selectUserSolution = state => state.userSolution.solution;

export default userSolutionSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';
import { CLICKTYPES, BOARD_CELLS } from '../Constants';
export const answerSlice = createSlice({
    name: 'answer',
    initialState: {
        value: BOARD_CELLS.map(() => ({ hited: false }))
    },
    reducers: {
        setHit: (state, action) => {
            switch (action.payload.type) {
                case CLICKTYPES.Hit:
                    state.value[action.payload.index] = { hitType: action.payload.type, hited: true };
                    break;
                case CLICKTYPES.Cross:
                    state.value[action.payload.index] = { hitType: action.payload.type, hited: true }
                    break;
                case CLICKTYPES.Unknown:
                    state.value[action.payload.index] = { hitType: action.payload.type, hited: true }
                    break;
                case CLICKTYPES.Clear:
                    state.value[action.payload.index] = { hited: false }
                    break;
                default:
                    break;
            }
        },
    },
});

export const { setHit } = answerSlice.actions;

export const selectAnswer = state => state.answer.value;

export default answerSlice.reducer;

